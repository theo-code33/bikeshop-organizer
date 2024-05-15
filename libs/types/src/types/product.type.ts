import { Brand } from './brand.type';
import { Common } from './common.type';
import { ProductCategory } from './productCategory.type';
import { Shop } from './shop.type';
import { Task } from './task.type';

export interface Product extends Common {
  name: string;
  brand?: Brand;
  price: number;
  shop: Shop;
  tasks?: Task[];
  category?: ProductCategory;
}
