import { Bike } from './bike.type';
import { Common } from './common.type';
import { Shop } from './shop.type';

export interface Client extends Common {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  shop: Shop;
  address: string;
  postalCode: string;
  city: string;
  bikes: Bike[];
}
