import { Bike } from '@bikeshop-organizer/types';
import { CreateBikeDto } from './types';
import instance from '..';

const updateBike = async (bikeId: string, bikeDto: CreateBikeDto) => {
  const response = await instance.patch<Bike>(`/bike/${bikeId}`, bikeDto);
  return response.data;
};

export default updateBike;
