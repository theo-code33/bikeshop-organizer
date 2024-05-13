import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as RolesEnum } from '@bikeshop-organizer/types';
import { IRequest } from '../auth/types/request.type';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get()
  findOneByEmail(@Query('email') email: string) {
    try {
      if (!email)
        throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
      return this.userService.findOneByEmail(email);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: IRequest
  ) {
    try {
      const { user } = req;
      if (user.role === RolesEnum.ADMIN || user.id === id) {
        if (updateUserDto.password) {
          const hash = await bcrypt.hash(updateUserDto.password, 10);
          updateUserDto.password = hash;
        }
        const updatedUser = await this.userService.update(id, updateUserDto);
        if (updateUserDto.email) {
          const payload = {
            email: updatedUser.email,
          };
          const token = await this.authService.signPayload(payload);
          return { user: updatedUser, token };
        }
        return updatedUser;
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
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
