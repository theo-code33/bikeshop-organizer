import { DeepPartial } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateProductDto {
  name: string;
  brand: DeepPartial<Brand>;
  price: number;
  shop: DeepPartial<Shop>;
  productCategory?: string;
}
