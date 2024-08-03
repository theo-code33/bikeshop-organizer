import { DeepPartial } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Task } from '../../task/entities/task.entity';

export class CreateTaskProductItemDto {
  quantity: number;
  product: DeepPartial<Product>;
  task: DeepPartial<Task>;
}
