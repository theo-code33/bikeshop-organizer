import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from './mail.service';
import { SendCreateShopMailDto } from './dto/send-create-shop-mail.dto';

@Controller('mail')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-create-shop-mail')
  sendCreateShopMail(@Body() sendCreateShopMailDto: SendCreateShopMailDto) {
    try {
      const {
        userId,
        email,
        userFirstName,
        userLastName,
        shopName,
        shopSiret,
        shopPhoneNumber,
        shopAddress,
        shopPostalCode,
        shopCity,
      } = sendCreateShopMailDto;
      return this.mailService.sendCreateShopMail(
        userId,
        email,
        userFirstName,
        userLastName,
        shopName,
        shopSiret,
        shopPhoneNumber,
        shopAddress,
        shopPostalCode,
        shopCity
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
