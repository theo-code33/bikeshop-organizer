import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateBrandDto {
  name: string;
  shop: DeepPartial<Shop>;
}
