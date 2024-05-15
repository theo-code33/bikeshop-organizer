import { Common } from './common.type';
import { Status } from './status.type';
import { Task } from './task.type';
import { TaskCategory } from './taskCategory.type';

export interface TaskCategoryStatus extends Common {
  status: Status;
  order: number;
  taskCategory: TaskCategory;
  tasks?: Task[];
}
