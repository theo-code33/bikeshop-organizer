import { Brand, ProductCategory, Shop } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type ProductDto = {
  name: string;
  price: number;
  brand?: DeepPartial<Brand> | null;
  category: DeepPartial<ProductCategory>;
  shop: DeepPartial<Shop>;
};
