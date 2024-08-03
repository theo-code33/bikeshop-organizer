import { Common } from './common.type';
import { Product } from './product.type';
import { Task } from './task.type';

export interface TaskProductItem extends Common {
  product: Product;
  quantity: number;
  task: Task;
}
