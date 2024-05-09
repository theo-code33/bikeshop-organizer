import { User } from '@bikeshop-organizer/types';
import instance from '..';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const response = await instance.get(`/user?email=${email}`);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
