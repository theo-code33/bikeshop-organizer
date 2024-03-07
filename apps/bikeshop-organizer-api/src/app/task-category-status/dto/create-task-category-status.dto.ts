import { DeepPartial } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { Status } from '../../status/entities/status.entity';

export class CreateTaskCategoryStatusDto {
  status: DeepPartial<Status>;
  order: number;
  taskCategory: DeepPartial<TaskCategory>;
}
