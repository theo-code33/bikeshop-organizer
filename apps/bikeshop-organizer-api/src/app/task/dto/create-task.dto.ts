import { DeepPartial } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Client } from '../../client/entities/client.entity';
import { CreateTaskProductItemDto } from '../../task-product-item/dto/create-task-product-item.dto';

export class CreateTaskDto {
  name: string;
  taskCategory: DeepPartial<TaskCategory>;
  taskCategoryStatus: DeepPartial<TaskCategoryStatus>;
  bike: DeepPartial<Bike>;
  client: DeepPartial<Client>;
  products?: CreateTaskProductItemDto[];
  startDate: string;
  endDate: string;
}
