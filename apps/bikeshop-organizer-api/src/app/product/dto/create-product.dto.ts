import { DeepPartial } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

export class CreateProductDto {
  name: string;
  brand?: DeepPartial<Brand>;
  price: number;
  shop: DeepPartial<Shop>;
  productCategory: DeepPartial<ProductCategory>;
}
