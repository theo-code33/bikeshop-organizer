import { Product } from '@bikeshop-organizer/types';
import instance from '..';

const getShopProducts = async (shopId: string): Promise<Product[]> => {
  const response = await instance.get(`/product/shop/${shopId}`);
  return response.data;
};

export default getShopProducts;
