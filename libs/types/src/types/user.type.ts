import { Common } from './common.type';
import { Roles } from './roles.type';

export interface User extends Common {
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
}

export interface UserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Roles;
}
