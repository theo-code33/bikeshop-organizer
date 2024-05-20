import instance from '..';

const deleteBrand = async (brandId: string): Promise<string> => {
  await instance.delete(`/brand/${brandId}`);
  return brandId;
};

export default deleteBrand;
