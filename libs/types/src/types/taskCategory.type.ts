import { Common } from './common.type';
import { Shop } from './shop.type';
import { Task } from './task.type';
import { TaskCategoryStatus } from './taskCategoryStatus.type';

export interface TaskCategory extends Common {
  name: string;
  shop: Shop;
  taskCategoryStatus?: TaskCategoryStatus[];
  tasks?: Task[];
}
