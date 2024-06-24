import instance from '..';

const deleteBike = async (bikeId: string) => {
  await instance.delete(`/bike/${bikeId}`);
  return bikeId;
};

export default deleteBike;
