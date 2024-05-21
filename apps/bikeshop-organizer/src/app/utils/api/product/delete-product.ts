import instance from '..';

const deleteProduct = async (productId: string) => {
  await instance.delete(`/product/${productId}`);
  return productId;
};

export default deleteProduct;
