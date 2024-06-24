import { Brand, Client, Task } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type CreateBikeDto = {
  brand: DeepPartial<Brand>;
  model: string;
  bicycode?: string;
  color: string;
  client?: DeepPartial<Client>;
  tasks?: DeepPartial<Task[]>;
};
