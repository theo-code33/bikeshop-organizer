import { Common } from './common.type';
import { Roles } from './roles.type';

export interface User extends Common {
  id: string;
  email: string;
  role: Roles;
}
