import { Status } from '@bikeshop-organizer/types';
import instance from '..';

const getStatusesByShopId = async (shopId: string): Promise<Status[]> => {
  const response = await instance.get(`/status/shop/${shopId}`);
  return response.data;
};

export default getStatusesByShopId;
