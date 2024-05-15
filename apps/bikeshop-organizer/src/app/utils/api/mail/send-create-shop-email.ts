import { User } from '@bikeshop-organizer/types';
import instance from '..';

const sendCreateShopEmail = async (user: User) => {
  const response = await instance.post('/mail/send-create-shop-mail', {
    userId: user.id,
    email: user.email,
    userFirstName: user.firstName,
    userLastName: user.lastName,
  });
  return response.data;
};

export default sendCreateShopEmail;
