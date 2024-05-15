import { Common } from './common.type';
import { Roles } from './roles.type';
import { Shop } from './shop.type';

export interface User extends Common {
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  shop?: Shop;
}

export interface UserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Roles;
}
