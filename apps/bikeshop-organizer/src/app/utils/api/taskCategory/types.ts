import { Shop, Status, TaskCategory } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type TaskCategoryStatusDto = {
  status: DeepPartial<Status>;
  order: number;
  taskCategory: DeepPartial<TaskCategory>;
};

export type TaskCategoryDto = {
  name: string;
  shop: DeepPartial<Shop>;
  taskCategoryStatus: Partial<TaskCategoryStatusDto>[];
};
