import { Roles } from '../../../libs/types';
export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Roles;
}
