import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.findForLogin(loginDto);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('send-email-reset-password')
  async sendEmailResetPassword(@Body() body: { email: string }) {
    try {
      const user = await this.userService.findOneByEmail(body.email);
      if (!user)
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      const { email } = user;
      const token = randomBytes(64).toString('hex');
      const expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + 1);
      await this.userService.update(user.id, {
        resetPasswordToken: token,
        resetPasswordExpires: expireDate,
      });
      await this.mailService.sendResetPassword(
        {
          email,
        },
        token
      );
      return { message: 'Email sent' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    const { token, password } = body;
    try {
      const user = await this.userService.findByResetPasswordToken(token);
      const updatedUser = await this.userService.update(user.id, {
        password,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      const newToken = await this.authService.signPayload({
        email: updatedUser.email,
      });
      return { user: updatedUser, token: newToken };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}
