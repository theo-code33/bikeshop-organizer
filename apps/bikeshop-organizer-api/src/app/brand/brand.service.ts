import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    return await this.brandRepository.save(createBrandDto);
  }

  async findByShop(shopId: string) {
    return await this.brandRepository.find({
      where: { shop: { id: shopId } },
      // relations: ['shop'], // TODO: Uncomment this line to include the shop details
    });
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['shop'],
    });
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.brandRepository.update(id, updateBrandDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.brandRepository.delete(id);
  }
}
