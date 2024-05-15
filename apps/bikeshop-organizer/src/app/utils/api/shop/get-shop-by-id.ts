import { Shop } from '@bikeshop-organizer/types';
import instance from '..';

const getShopById = async (shopId: string): Promise<Shop> => {
  const response = await instance.get(`/shop/${shopId}`);
  return response.data;
};

export default getShopById;
