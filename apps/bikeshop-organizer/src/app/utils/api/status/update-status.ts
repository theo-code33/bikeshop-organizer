import { Status } from '@bikeshop-organizer/types';
import instance from '..';
import { StatusDto } from './types';

const updateStatus = async (
  status: Partial<StatusDto> & { id: string }
): Promise<Status> => {
  const response = await instance.patch(`/status/${status.id}`, status);
  return response.data;
};

export default updateStatus;
