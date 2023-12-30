import { Bike } from './bike.type';
import { Common } from './common.type';
import { Product } from './product.type';

export interface Brand extends Common {
  id: string;
  name: string;
  bikes: Bike[];
  products: Product[];
}
