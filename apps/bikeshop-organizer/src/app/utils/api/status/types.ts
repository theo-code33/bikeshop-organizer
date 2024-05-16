import { Shop } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type StatusDto = {
  name: string;
  description?: string;
  color: string;
  shop: DeepPartial<Shop>;
};
