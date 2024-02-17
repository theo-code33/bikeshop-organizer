import { Roles } from '@bikeshop-organizer/types';

export class CreateUserDto {
  email: string;
  password: string;
  role?: Roles;
}
