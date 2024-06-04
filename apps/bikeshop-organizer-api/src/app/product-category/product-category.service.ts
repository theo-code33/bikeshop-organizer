import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {}
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      const createdProductCategory = await this.productCategoryRepository.save(
        createProductCategoryDto
      );
      const productCategory = await this.findOne(createdProductCategory.id);
      return productCategory;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllByShop(shopId: string) {
    const productCategories = await this.productCategoryRepository.find({
      where: { shop: { id: shopId } },
      relations: ['shop', 'products'],
    });
    return productCategories;
  }

  async findOne(id: string) {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id },
      relations: ['shop', 'products'],
    });
    if (!productCategory) {
      throw new HttpException(
        'Product category not found',
        HttpStatus.NOT_FOUND
      );
    }

    return productCategory;
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      await this.productCategoryRepository.update(id, updateProductCategoryDto);
      const productCategory = await this.findOne(id);
      return productCategory;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string) {
    return await this.productCategoryRepository.delete(id);
  }
}
