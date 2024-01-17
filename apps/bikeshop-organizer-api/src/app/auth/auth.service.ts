import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { sign } from 'jsonwebtoken';
import { Payload } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    const { email } = payload;
    return await this.userService.findOneByEmail(email);
  }
}
