import { DeepPartial } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Brand } from '@bikeshop-organizer/types';

export class CreateBikeDto {
  brand: DeepPartial<Brand>;
  model: string;
  bicycode?: string;
  color: string;
  client: DeepPartial<Client>;
  tasks?: string; // TODO: connect to Task entity => Replace by DeepPartial<Task[]>
}
