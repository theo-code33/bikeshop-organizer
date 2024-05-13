import { Common } from './common.type';
import { Roles } from './roles.type';

export interface User extends Common {
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
}
