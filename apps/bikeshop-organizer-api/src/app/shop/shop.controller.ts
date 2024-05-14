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
  Req,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '@bikeshop-organizer/types';
import { IRequest } from '../auth/types/request.type';
import { UserService } from '../user/user.service';
import { CreateStatusDto } from '../status/dto/create-status.dto';
import { StatusService } from '../status/status.service';
import { TaskCategoryStatusService } from '../task-category-status/task-category-status.service';
import { CreateTaskCategoryStatusDto } from '../task-category-status/dto/create-task-category-status.dto';
import { TaskCategoryService } from '../task-category/task-category.service';
import { CreateTaskCategoryDto } from '../task-category/dto/create-task-category.dto';

@Controller('shop')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService,
    private readonly statusService: StatusService,
    private readonly taskCategoryService: TaskCategoryService,
    private readonly taskCategoryStatusService: TaskCategoryStatusService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createShopDto: CreateShopDto) {
    try {
      const shop = await this.shopService.create(createShopDto);
      const userData = {
        role: RolesEnum.SHOP,
      };
      const taskCategory: CreateTaskCategoryDto = {
        name: 'Réparation',
        shop: { id: shop.id },
      };
      const taskCategoryCreated = await this.taskCategoryService.create(
        taskCategory
      );
      const newStatus: CreateStatusDto[] = [
        {
          name: 'À faire',
          color: '#36027D',
          shop: { id: shop.id },
        },
        {
          name: 'En cours',
          color: '#F1A91F',
          shop: { id: shop.id },
        },
        {
          name: 'Terminé',
          color: '#1AD698',
          shop: { id: shop.id },
        },
      ];
      let i = 1;
      for (const status of newStatus) {
        const statusCreated = await this.statusService.create(status);
        const taskCategoryStatus: CreateTaskCategoryStatusDto = {
          status: { id: statusCreated.id },
          order: i,
          taskCategory: { id: taskCategoryCreated.id },
        };
        await this.taskCategoryStatusService.create(taskCategoryStatus);
        i++;
      }
      await this.userService.update(shop.user.id, userData);
      const shopUpdated = await this.shopService.findOne(shop.id);
      return shopUpdated;
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
      return this.shopService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @Req() req: IRequest
  ) {
    try {
      const { user } = req;
      if (user.role === RolesEnum.ADMIN || user.role === RolesEnum.SHOP) {
        const shop = await this.shopService.findOne(id);
        if (user.id !== shop.user.id && user.role !== RolesEnum.ADMIN) {
          throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
        }
      }
      return this.shopService.update(id, updateShopDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id') id: string) {
    try {
      return this.shopService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
