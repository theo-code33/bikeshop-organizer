import { User } from '@bikeshop-organizer/types';
import instance from '..';

const register = async (
  email: string,
  password: string
): Promise<
  | {
      token: string;
      user: User;
    }
  | {
      message: string;
    }
> => {
  const response = await instance.post('/auth/register', {
    email,
    password,
  });
  return response.data;
};

export default register;
