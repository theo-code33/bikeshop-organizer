import { Shop } from '@bikeshop-organizer/types';
import { DeepPartial } from 'react-hook-form';

export type ClientDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  shop: DeepPartial<Shop>;
  address: string;
  postalCode: string;
  city: string;
};
