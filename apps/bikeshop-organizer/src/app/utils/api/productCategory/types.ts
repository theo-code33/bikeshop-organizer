import { Shop } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type ProductCategoryDto = {
  name: string;
  shop: DeepPartial<Shop>;
};
