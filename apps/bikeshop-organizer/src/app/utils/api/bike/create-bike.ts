import { Bike } from '@bikeshop-organizer/types';
import { CreateBikeDto } from './types';
import instance from '..';

const createBike = async (bikeDto: CreateBikeDto): Promise<Bike> => {
  const response = await instance.post<Bike>('/bike', bikeDto);
  return response.data;
};

export default createBike;
