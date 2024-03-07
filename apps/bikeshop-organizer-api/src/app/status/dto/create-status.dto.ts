import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateStatusDto {
  name: string;
  description?: string;
  color: string;
  shop: DeepPartial<Shop>;
}
