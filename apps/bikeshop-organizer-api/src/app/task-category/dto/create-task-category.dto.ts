import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { CreateTaskCategoryStatusDto } from '../../task-category-status/dto/create-task-category-status.dto';

export class CreateTaskCategoryDto {
  name: string;
  shop: DeepPartial<Shop>;
  taskCategoryStatus?: CreateTaskCategoryStatusDto[];
}
