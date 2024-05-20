import instance from '..';
import { BrandDto } from './types';

const createBrand = async (brandDto: BrandDto) => {
  const response = await instance.post('/brand', brandDto);
  return response.data;
};

export default createBrand;
