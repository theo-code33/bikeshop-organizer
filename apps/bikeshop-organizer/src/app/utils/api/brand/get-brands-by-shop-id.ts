import { Brand } from '@bikeshop-organizer/types';
import instance from '..';

const getBrandsByShopId = async (shopId: string): Promise<Brand[]> => {
  const response = await instance.get(`/brand/shop/${shopId}`);
  return response.data;
};

export default getBrandsByShopId;
