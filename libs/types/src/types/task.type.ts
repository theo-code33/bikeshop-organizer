import { Bike } from './bike.type';
import { Common } from './common.type';
import { Product } from './product.type';
import { TaskCategory } from './taskCategory.type';
import { TaskCategoryStatus } from './taskCategoryStatus.type';

export interface Task extends Common {
  products: Product[];
  status: TaskCategoryStatus;
  mission: TaskCategory;
  bike: Bike;
  startDate: Date;
  endDate: Date;
}
