import { Common } from './common.type';
import { Product } from './product.type';

export interface ProductCategory extends Common {
  name: string;
  products: Product[];
}
