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

@Controller('shop')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly userService: UserService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  async create(@Body() createShopDto: CreateShopDto) {
    try {
      const shop = await this.shopService.create(createShopDto);
      const userData = {
        role: RolesEnum.SHOP,
      };
      const user = await this.userService.update(shop.user.id, userData);
      shop.user = user;
      return shop;
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
