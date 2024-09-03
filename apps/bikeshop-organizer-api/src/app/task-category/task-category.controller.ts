import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '../../libs/types';
import { IRequest } from '../auth/types/request.type';
import { TaskCategoryStatusService } from '../task-category-status/task-category-status.service';

@Controller('task-category')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService,
    private readonly taskCategoryStatusService: TaskCategoryStatusService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    try {
      const taskCategoryCreated = await this.taskCategoryService.create({
        name: createTaskCategoryDto.name,
        shop: createTaskCategoryDto.shop,
      });
      if (
        createTaskCategoryDto.taskCategoryStatus &&
        createTaskCategoryDto.taskCategoryStatus.length > 0
      ) {
        for (const taskCategoryStatus of createTaskCategoryDto.taskCategoryStatus) {
          await this.taskCategoryStatusService.create({
            ...taskCategoryStatus,
            taskCategory: { id: taskCategoryCreated.id },
          });
        }
      }
      const taskCategory = await this.taskCategoryService.findOne(
        taskCategoryCreated.id
      );
      return taskCategory;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('shop/:shopId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAll(@Param('shopId') shopId: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP && user.shop.id === shopId) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.taskCategoryService.findAllByShop(shopId);
      }
      throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  async findOne(@Param('id') id: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      const taskCategory = await this.taskCategoryService.findOne(id);
      if (
        user.role === RolesEnum.SHOP &&
        user.shop.id !== taskCategory.shop.id
      ) {
        throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
      }
      return this.taskCategoryService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  update(
    @Param('id') id: string,
    @Body() updateTaskCategoryDto: UpdateTaskCategoryDto
  ) {
    try {
      return this.taskCategoryService.update(id, updateTaskCategoryDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async remove(@Param('id') id: string) {
    try {
      const taskCategory = await this.taskCategoryService.findOne(id);
      if (!taskCategory) {
        throw new HttpException('TaskCategory not found', HttpStatus.NOT_FOUND);
      }
      for (const taskCategoryStatus of taskCategory.taskCategoryStatus) {
        await this.taskCategoryStatusService.remove(taskCategoryStatus.id);
      }
      return this.taskCategoryService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
