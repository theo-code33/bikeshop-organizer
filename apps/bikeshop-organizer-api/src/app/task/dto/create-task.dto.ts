import { DeepPartial } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Bike } from '../../bike/entities/bike.entity';

export class CreateTaskDto {
  products?: string; // TODO: replace with a Product entity
  taskCategory: DeepPartial<TaskCategory>;
  taskCategoryStatus: DeepPartial<TaskCategoryStatus>;
  bike: DeepPartial<Bike>;
  startDate: string;
  endDate: string;
}
