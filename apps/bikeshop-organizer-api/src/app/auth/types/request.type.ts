import { User } from '../../user/entities/user.entity';

export interface IRequest extends Request {
  user: User;
}
