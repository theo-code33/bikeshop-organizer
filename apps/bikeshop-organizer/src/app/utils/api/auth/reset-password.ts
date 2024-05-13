import { User } from '@bikeshop-organizer/types';
import instance from '..';

const resetPassword = async (
  token: string,
  password: string
): Promise<{
  token: string;
  user: User;
}> => {
  const response = await instance.post('/auth/reset-password', {
    token,
    password,
  });
  return response.data;
};

export default resetPassword;
