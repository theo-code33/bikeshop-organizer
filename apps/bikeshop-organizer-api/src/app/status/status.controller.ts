import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { Roles as RolesEnum } from '../../libs/types';

@Controller('status')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get('task-category-status/:taskCategoryStatusId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAllByTaskCategoryStatus(
    @Param('taskCategoryStatusId') taskCategoryStatusId: string
  ) {
    try {
      return this.statusService.findAllByTaskCategoryStatus(
        taskCategoryStatusId
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('shop/:shopId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAllByShop(@Param('shopId') shopId: string) {
    try {
      return this.statusService.findAllByShop(shopId);
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
      return this.statusService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      return this.statusService.update(id, updateStatusDto);
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
      return this.statusService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
