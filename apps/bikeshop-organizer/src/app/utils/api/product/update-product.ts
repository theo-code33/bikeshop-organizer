import instance from '..';
import { ProductDto } from './types';

const updateProduct = async (
  productId: string,
  productDto: Partial<ProductDto>
) => {
  const response = await instance.patch(`/product/${productId}`, productDto);
  return response.data;
};

export default updateProduct;
