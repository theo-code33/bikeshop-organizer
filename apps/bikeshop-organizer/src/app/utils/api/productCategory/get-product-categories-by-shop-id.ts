import { ProductCategory } from '@bikeshop-organizer/types';
import instance from '..';

const getProductCategoriesByShopId = async (
  shopId: string
): Promise<ProductCategory[]> => {
  const response = await instance.get(`/product-category/shop/${shopId}`);
  return response.data;
};

export default getProductCategoriesByShopId;
