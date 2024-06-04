import instance from '..';

const deleteProductCategory = async (productCategoryId: string) => {
  await instance.delete(`/product-category/${productCategoryId}`);
  return productCategoryId;
};

export default deleteProductCategory;
