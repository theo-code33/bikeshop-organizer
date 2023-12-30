import { Common } from './common.type';
import { Product } from './product.type';

export interface ProductCategory extends Common {
  id: string;
  name: string;
  products: Product[];
}
