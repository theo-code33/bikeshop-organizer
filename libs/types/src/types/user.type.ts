import { Common } from './common.type';
import { Roles } from './roles.type';

export interface User extends Common {
  email: string;
  role: Roles;
}
