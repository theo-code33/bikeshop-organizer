import { DeepPartial } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Task } from '../../task/entities/task.entity';

export class CreateBikeDto {
  brand: DeepPartial<Brand>;
  model: string;
  bicycode?: string;
  color: string;
  client: DeepPartial<Client>;
  tasks?: DeepPartial<Task[]>;
}
