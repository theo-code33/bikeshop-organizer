import { DeepPartial } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';

export class CreateTaskCategoryStatusDto {
  status: string; // TODO: connect to Status entity => Replace by DeepPartial<Status[]>
  order: number;
  taskCategory: DeepPartial<TaskCategory>;
}
