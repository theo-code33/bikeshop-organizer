import { DeepPartial } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { CreateBikeDto } from '../../bike/dto/create-bike.dto';

export class CreateClientDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  shop: DeepPartial<Shop>;
  address: string;
  postalCode: string;
  city: string;
  bikes?: CreateBikeDto[];
}
