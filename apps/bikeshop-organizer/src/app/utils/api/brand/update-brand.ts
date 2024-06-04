import { Brand } from '@bikeshop-organizer/types';
import { BrandDto } from './types';
import instance from '..';

const updateBrand = async (
  brandId: string,
  updateBrandDto: Partial<BrandDto>
): Promise<Brand> => {
  const response = await instance.patch(`/brand/${brandId}`, updateBrandDto);
  return response.data;
};

export default updateBrand;
