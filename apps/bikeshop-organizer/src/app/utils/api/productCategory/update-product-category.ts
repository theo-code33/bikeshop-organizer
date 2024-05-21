import { ProductCategory } from '@bikeshop-organizer/types';
import { ProductCategoryDto } from './types';
import instance from '..';

const updateProductCategory = async (
  productCategoryId: string,
  productCategoryDto: Partial<ProductCategoryDto>
): Promise<ProductCategory> => {
  const response = await instance.patch(
    `/product-category/${productCategoryId}`,
    productCategoryDto
  );
  return response.data;
};

export default updateProductCategory;
