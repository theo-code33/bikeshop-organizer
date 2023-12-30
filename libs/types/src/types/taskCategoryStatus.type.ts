import { Common } from './common.type';
import { Status } from './status.type';
import { Task } from './task.type';
import { TaskCategory } from './taskCategory.type';

export interface TaskCategoryStatus extends Common {
  id: string;
  status: Status;
  order: number;
  missions: TaskCategory[];
  tasks: Task[];
}
