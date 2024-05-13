import { Roles } from '@bikeshop-organizer/types';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: Roles;
}
