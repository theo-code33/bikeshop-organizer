import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateTaskCategoryDto {
  name: string;
  shop: DeepPartial<Shop>;
  taskCategoryStatus: string; // TODO: connect to TaskCategoryStatus entity => Replace by DeepPartial<TaskCategoryStatus[]>
  tasks: string; // TODO: connect to Task entity => Replace by DeepPartial<Task[]>
}
