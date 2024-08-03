import { Client } from '@bikeshop-organizer/types';
import instance from '..';

const getShopClients = async (shopId: string): Promise<Client[]> => {
  const response = await instance.get(`/client/shop/${shopId}`);
  return response.data;
};

export default getShopClients;
