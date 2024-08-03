import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles as RolesEnum } from '@bikeshop-organizer/types';
import { Roles } from '../auth/decorators/roles.decorator';
import { TaskProductItemService } from '../task-product-item/task-product-item.service';
import { CreateTaskProductItemDto } from '../task-product-item/dto/create-task-product-item.dto';
import { TaskProductItem } from '../task-product-item/entities/task-product-item.entity';

@Controller('task')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskProductItemService: TaskProductItemService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const taskProductItem = [...createTaskDto.products];
      delete createTaskDto.products;
      const taskCreated = await this.taskService.create(createTaskDto);
      if (taskProductItem.length > 0) {
        taskProductItem.forEach(async (product) => {
          const taskProductItemDto: CreateTaskProductItemDto = {
            ...product,
            task: { id: taskCreated.id },
          };
          await this.taskProductItemService.create(taskProductItemDto);
        });
      }
      const task = await this.taskService.findOne(taskCreated.id);
      return task;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('task-category/:taskCategoryId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAllByTaskCategory(@Param('taskCategoryId') taskCategoryId: string) {
    try {
      return this.taskService.findAllByTaskCategory(taskCategoryId);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findOne(@Param('id') id: string) {
    try {
      return this.taskService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const currentTask = await this.taskService.findOne(id);

      if (currentTask.products.length > 0 && !updateTaskDto.products) {
        for (const product of currentTask.products) {
          await this.taskProductItemService.remove(product.id);
        }
      }
      if (updateTaskDto.products) {
        // Create task product item if not exist
        for (const product of updateTaskDto.products) {
          if ('id' in product === false) {
            const taskProductItemDto: CreateTaskProductItemDto = {
              ...product,
              task: { id: id },
            };
            await this.taskProductItemService.create(taskProductItemDto);
          }
        }
        // Remove the task product in updateTaskDto that was just created
        updateTaskDto.products = updateTaskDto.products.filter(
          (productItem) => 'id' in productItem
        );

        // compare the current task products with the updateTaskDto products
        if (currentTask.products.length > 0) {
          // Delete task product item if not exist in updateTaskDto
          const taskProductItemToDelete = currentTask.products
            .map((product) => {
              if (
                updateTaskDto.products.find(
                  (productItem) =>
                    (productItem as TaskProductItem).id === product.id
                ) === undefined
              ) {
                return product.id;
              }
            })
            .filter(Boolean);

          if (taskProductItemToDelete.length > 0) {
            taskProductItemToDelete.forEach(async (id) => {
              await this.taskProductItemService.remove(id);
            });
            // Remove the task product in currentTask that was just deleted
            updateTaskDto.products = updateTaskDto.products.filter(
              (product) => {
                return (
                  taskProductItemToDelete.includes(
                    (product as TaskProductItem).id
                  ) === true
                );
              }
            );
          }

          // Update task product item if exist in updateTaskDto
          updateTaskDto.products.forEach(async (product) => {
            if ('id' in product) {
              const taskProductItemInCurrentTask = currentTask.products.find(
                (productItem) => productItem.id === product.id
              );
              if (
                taskProductItemInCurrentTask &&
                taskProductItemInCurrentTask.quantity !== product.quantity
              ) {
                await this.taskProductItemService.update(product.id, {
                  quantity: product.quantity,
                });
              }
            }
          });
        }
      }
      delete updateTaskDto.products;
      return this.taskService.update(id, updateTaskDto);
    } catch (error) {
      new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async remove(@Param('id') id: string) {
    try {
      const task = await this.taskService.findOne(id);
      if (task.products.length > 0) {
        for (const product of task.products) {
          await this.taskProductItemService.remove(product.id);
        }
      }
      const taskDeleted = this.taskService.remove(id);
      return taskDeleted;
    } catch (error) {
      new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
