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
import { BikeService } from '../bike/bike.service';

@Controller('client')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly bikeService: BikeService
  ) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SHOP)
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const clientCreated = await this.clientService.create(createClientDto);
      if (!createClientDto.bikes) {
        return clientCreated;
      }
      if (createClientDto.bikes) {
        for (const bike of createClientDto.bikes) {
          if (bike.brand.name) {
            delete bike.brand.name;
          }

          await this.bikeService.create({
            ...bike,
            client: { id: clientCreated.id },
          });
        }
        const clientCreatedWithBikes = await this.clientService.findOne(
          clientCreated.id
        );
        return clientCreatedWithBikes;
      }
      return clientCreated;
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
        (user.role === RolesEnum.SHOP && user.shop.id === shopId) ||
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
      if (user.role === RolesEnum.SHOP && user.shop.id !== client.shop.id) {
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
  async remove(@Param('id') id: string) {
    try {
      const client = await this.clientService.findOne(id);
      if (client.bikes) {
        client.bikes.forEach(async (bike) => {
          await this.bikeService.remove(bike.id);
        });
      }
      return this.clientService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
