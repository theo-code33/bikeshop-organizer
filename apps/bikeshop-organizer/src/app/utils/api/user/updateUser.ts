import { User } from '@bikeshop-organizer/types';
import instance from '..';

const updateUser = async (
  user: Partial<User> & { password?: string }
): Promise<User | { user: User; token: string }> => {
  const response = await instance.patch(`/user/${user.id}`, user);
  return response.data;
};

export default updateUser;
