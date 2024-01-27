import { DeepPartial } from 'typeorm';
import { Client } from '../../client/entities/client.entity';

export class CreateBikeDto {
  brand: string; // TODO: connect to Brand entity => Replace by DeepPartial<Brand>
  model: string;
  bicycode?: string;
  color: string;
  client: DeepPartial<Client>;
  tasks?: string; // TODO: connect to Task entity => Replace by DeepPartial<Task[]>
}
