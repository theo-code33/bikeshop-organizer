import { User, UserDto } from '@bikeshop-organizer/types';
import instance from '..';

const register = async (
  userDto: UserDto
): Promise<
  | {
      token: string;
      user: User;
    }
  | {
      message: string;
    }
> => {
  const response = await instance.post('/auth/register', userDto);
  return response.data;
};

export default register;
