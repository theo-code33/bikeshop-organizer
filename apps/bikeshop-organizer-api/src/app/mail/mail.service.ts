import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPassword(
    user: {
      email: string;
    },
    token: string
  ) {
    const url =
      process.env.NODE_ENV === 'production'
        ? `${process.env.FRONTEND_URL}/reset-password?token=${token}`
        : `http://localhost:4200/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: './reset-password',
      context: {
        url,
      },
    });
  }

  async sendCreateShopMail(
    userId: string,
    email: string,
    userFirstName: string,
    userLastName: string
  ) {
    await this.mailerService.sendMail({
      to: process.env.MAIL_ADMIN,
      subject: 'New shop to approve',
      template: './create-shop',
      context: {
        userId,
        email,
        userFirstName,
        userLastName,
      },
    });
  }
}
