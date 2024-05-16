import { Status } from '@bikeshop-organizer/types';
import instance from '..';
import { StatusDto } from './types';
const createStatus = async (status: StatusDto): Promise<Status> => {
  const response = await instance.post<Status>('/status', status);
  return response.data;
};

export default createStatus;
