import { Shop, Status } from '@bikeshop-organizer/types';
import instance from '..';
import { DeepPartial } from 'react-hook-form';

type StatusDto = {
  name: string;
  description?: string;
  color: string;
  shop: DeepPartial<Shop>;
};

const createStatus = async (status: StatusDto): Promise<Status> => {
  const response = await instance.post<Status>('/status', status);
  return response.data;
};

export default createStatus;
