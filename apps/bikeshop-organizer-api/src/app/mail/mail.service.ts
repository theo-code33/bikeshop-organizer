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
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: './reset-password',
      context: {
        url,
      },
    });
  }
}
