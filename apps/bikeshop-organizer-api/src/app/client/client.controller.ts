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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '@bikeshop-organizer/types';
import { IRequest } from '../auth/types/request.type';

@Controller('client')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  create(@Body() createClientDto: CreateClientDto) {
    try {
      return this.clientService.create(createClientDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('shop/:shopId')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  findAllByShop(@Param('shopId') shopId: string, @Req() req: IRequest) {
    try {
      const { user } = req;
      if (
        (user.role === RolesEnum.SHOP && user.id === shopId) ||
        user.role === RolesEnum.ADMIN
      ) {
        return this.clientService.findAllByShop(shopId);
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
      const client = await this.clientService.findOne(id);
      if (user.role === RolesEnum.SHOP && user.id !== client.shop.id) {
        throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
      }
      return client;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP, RolesEnum.EMPLOYEE)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      return this.clientService.update(id, updateClientDto);
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
      return this.clientService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
