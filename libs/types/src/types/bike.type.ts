import { Brand } from './brand.type';
import { Client } from './client.type';
import { Common } from './common.type';
import { Task } from './task.type';

export interface Bike extends Common {
  brand: Brand;
  model: string;
  bicycode?: string;
  color: string;
  client: Client;
  tasks: Task[];
}
