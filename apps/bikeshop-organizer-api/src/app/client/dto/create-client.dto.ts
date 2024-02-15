import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

export class CreateClientDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  shop: DeepPartial<Shop>;
  address: string;
  postalCode: string;
  city: string;
}
