import { DeepPartial } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Brand } from '../../brand/entities/brand.entity';

export class CreateBikeDto {
  brand: DeepPartial<Brand>;
  model: string;
  bicycode?: string;
  color: string;
  client: DeepPartial<Client>;
  tasks?: string; // TODO: connect to Task entity => Replace by DeepPartial<Task[]>
}
