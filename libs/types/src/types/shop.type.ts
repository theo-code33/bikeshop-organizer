import { Brand } from './brand.type';
import { Client } from './client.type';
import { Common } from './common.type';
import { Product } from './product.type';
import { ProductCategory } from './productCategory.type';
import { Status } from './status.type';
import { TaskCategory } from './taskCategory.type';
import { User } from './user.type';

export interface Shop extends Common {
  user: User;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
  taskCategories?: TaskCategory[];
  clients?: Client[];
  products?: Product[];
  brands?: Brand[];
  status?: Status[];
  categories?: ProductCategory[];
}
