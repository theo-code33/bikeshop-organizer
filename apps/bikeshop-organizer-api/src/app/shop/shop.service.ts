import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>
  ) {}
  async create(createShopDto: CreateShopDto) {
    const shop = await this.shopRepository.save(createShopDto);
    return shop;
  }

  async findOne(id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });
    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    return shop;
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    await this.shopRepository.update(id, updateShopDto);
    const shop = await this.findOne(id);
    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    return shop;
  }

  remove(id: string) {
    return this.shopRepository.delete(id);
  }
}