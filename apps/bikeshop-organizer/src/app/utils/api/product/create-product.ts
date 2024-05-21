import { Product } from '@bikeshop-organizer/types';
import { ProductDto } from './types';
import instance from '..';

const createProduct = async (productDto: ProductDto): Promise<Product> => {
  const response = await instance.post('/product', productDto);
  return response.data;
};

export default createProduct;
