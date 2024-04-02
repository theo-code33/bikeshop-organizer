import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productRepository.save(createProductDto);
    const product = await this.findOne(createdProduct.id);
    return product;
  }

  async findAllByShop(shopId: string) {
    const products = await this.productRepository.find({
      where: { shop: { id: shopId } },
      relations: ['brand', 'shop', 'tasks'],
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'shop', 'tasks'],
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const product = await this.findOne(id);
    return product;
  }

  async remove(id: string) {
    return await this.productRepository.delete(id);
  }
}
