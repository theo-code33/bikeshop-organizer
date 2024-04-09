import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateProductCategoryDto {
  name: string;
  shop: DeepPartial<Shop>;
}
