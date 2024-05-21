import { ProductCategory } from '@bikeshop-organizer/types';
import { ProductCategoryDto } from './types';
import instance from '..';

const createProductCategory = async (
  productCategoryDto: ProductCategoryDto
): Promise<ProductCategory> => {
  const response = await instance.post('/product-category', productCategoryDto);
  return response.data;
};

export default createProductCategory;
