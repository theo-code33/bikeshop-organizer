import { User } from '@bikeshop-organizer/types';
import instance from '..';
import { ShopDto } from './types';

const sendCreateShopEmail = async (user: User, shop: ShopDto) => {
  const response = await instance.post('/mail/send-create-shop-mail', {
    userId: user.id,
    email: shop.email,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    shopName: shop.name,
    shopSiret: shop.siret,
    shopPhoneNumber: shop.phoneNumber,
    shopAddress: shop.address,
    shopPostalCode: shop.postalCode,
    shopCity: shop.city,
  });
  return response.data;
};

export default sendCreateShopEmail;
