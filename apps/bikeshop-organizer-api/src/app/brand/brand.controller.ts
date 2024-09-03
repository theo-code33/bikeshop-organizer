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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles as RolesEnum } from '../../libs/types';
import { Roles } from '../auth/decorators/roles.decorator';
import { IRequest } from '../auth/types/request.type';

@Controller('brand')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  create(@Body() createBrandDto: CreateBrandDto) {
    try {
      return this.brandService.create(createBrandDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/shop/:shopId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findByShop(@Param('shopId') shopId: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP && user.shop.id === shopId) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.brandService.findByShop(shopId);
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
  findOne(@Param('id') id: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP &&
          user.shop.brands.some((brand) => brand.id === id)) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.brandService.findOne(id);
      }
      throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Req() req: IRequest
  ) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP &&
          user.shop.brands.some((brand) => brand.id === id)) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.brandService.update(id, updateBrandDto);
      }
      throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  remove(@Param('id') id: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP &&
          user.shop.brands.some((brand) => brand.id === id)) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.brandService.remove(id);
      }
      throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
