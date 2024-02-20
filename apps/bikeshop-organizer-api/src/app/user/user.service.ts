import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { User as UserInterface } from '@bikeshop-organizer/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const user = await this.userRepository.save(createUserDto);
    return this.sanitizeUser(user);
  }

  async findForLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['shop', 'shop.clients', 'shop.brands'],
      select: ['id', 'email', 'password', 'role'],
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log(passwordValid);

    if (passwordValid) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['shop', 'shop.clients', 'shop.brands'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.sanitizeUser(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['shop', 'shop.clients', 'shop.brands'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.sanitizeUser(user);
  }

  async findByResetPasswordToken(token: string) {
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    return this.sanitizeUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
    }
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['shop', 'shop.clients', 'shop.brands'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.sanitizeUser(user);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  sanitizeUser(user: User): UserInterface {
    if (!user) return null;
    const sanitized = user;
    delete sanitized.password;
    return sanitized;
  }
}
