import { Client } from './client.type';
import { Common } from './common.type';
import { Product } from './product.type';
import { TaskCategory } from './taskCategory.type';
import { User } from './user.type';

export interface Shop extends Common {
  id: string;
  user: User;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
  tasksCategory: TaskCategory[];
  clients: Client[];
  products: Product[];
}
