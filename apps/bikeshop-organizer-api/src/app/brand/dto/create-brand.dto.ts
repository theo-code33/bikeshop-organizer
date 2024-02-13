import { Bike } from '@bikeshop-organizer/types';
import { DeepPartial } from 'typeorm';

export class CreateBrandDto {
  name: string;
  product?: string; // TODO: connect to Product entity => Replace by DeepPartial<Product>
  bikes?: DeepPartial<Bike[]>;
}
