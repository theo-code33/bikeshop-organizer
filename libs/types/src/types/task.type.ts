import { Bike } from './bike.type';
import { Client } from './client.type';
import { Common } from './common.type';
import { Product } from './product.type';
import { TaskCategory } from './taskCategory.type';
import { TaskCategoryStatus } from './taskCategoryStatus.type';

export interface Task extends Common {
  name: string;
  products?: Product[];
  taskCategoryStatus: TaskCategoryStatus;
  mission: TaskCategory;
  bike: Bike;
  client: Client;
  startDate: string;
  endDate: string;
}
