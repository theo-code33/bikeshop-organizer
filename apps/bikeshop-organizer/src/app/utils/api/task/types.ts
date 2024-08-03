import {
  Bike,
  Client,
  Product,
  TaskCategory,
  TaskCategoryStatus,
} from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type TaskDto = {
  name: string;
  taskCategory: DeepPartial<TaskCategory>;
  taskCategoryStatus: DeepPartial<TaskCategoryStatus>;
  bike: DeepPartial<Bike>;
  client: DeepPartial<Client>;
  products?: TaskProductItemDto[];
  startDate?: string;
  endDate: string;
};

export type TaskProductItemDto = {
  product: DeepPartial<Product>;
  quantity: number;
};
