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
import { Roles as RolesEnum } from '@bikeshop-organizer/types';
import { IRequest } from '../auth/types/request.type';

@Controller('task-category')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskCategoryController {
  constructor(private readonly taskCategoryService: TaskCategoryService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    try {
      return this.taskCategoryService.create(createTaskCategoryDto);
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
  remove(@Param('id') id: string) {
    try {
      return this.taskCategoryService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
