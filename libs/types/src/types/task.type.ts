import { Bike } from './bike.type';
import { Client } from './client.type';
import { Common } from './common.type';
import { TaskCategory } from './taskCategory.type';
import { TaskCategoryStatus } from './taskCategoryStatus.type';
import { TaskProductItem } from './taskProductItem.type';

export interface Task extends Common {
  name: string;
  products?: TaskProductItem[];
  taskCategoryStatus: TaskCategoryStatus;
  mission: TaskCategory;
  bike: Bike;
  client: Client;
  startDate: string;
  endDate: string;
}
