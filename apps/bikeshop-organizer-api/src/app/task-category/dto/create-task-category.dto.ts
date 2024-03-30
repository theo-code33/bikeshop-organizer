import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateTaskCategoryDto {
  name: string;
  shop: DeepPartial<Shop>;
}
