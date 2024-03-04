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
} from '@nestjs/common';
import { TaskCategoryStatusService } from './task-category-status.service';
import { CreateTaskCategoryStatusDto } from './dto/create-task-category-status.dto';
import { UpdateTaskCategoryStatusDto } from './dto/update-task-category-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '@bikeshop-organizer/types';

@Controller('task-category-status')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskCategoryStatusController {
  constructor(
    private readonly taskCategoryStatusService: TaskCategoryStatusService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  create(@Body() createTaskCategoryStatusDto: CreateTaskCategoryStatusDto) {
    try {
      return this.taskCategoryStatusService.create(createTaskCategoryStatusDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('task-category/:taskCategoryId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAll(@Param('taskCategoryId') taskCategoryId: string) {
    try {
      return this.taskCategoryStatusService.findAllByTaskCategory(
        taskCategoryId
      );
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
      return this.taskCategoryStatusService.findOne(id);
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
    @Body() updateTaskCategoryStatusDto: UpdateTaskCategoryStatusDto
  ) {
    try {
      return this.taskCategoryStatusService.update(
        id,
        updateTaskCategoryStatusDto
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  remove(@Param('id') id: string) {
    try {
      return this.taskCategoryStatusService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
