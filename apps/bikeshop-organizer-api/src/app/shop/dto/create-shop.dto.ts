import { DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class CreateShopDto {
  user: DeepPartial<User>;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
  taskCategories?: string;
  clients?: string;
  products?: string;
}
