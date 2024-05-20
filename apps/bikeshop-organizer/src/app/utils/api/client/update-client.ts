import { Client } from '@bikeshop-organizer/types';
import { ClientDto } from './types';
import instance from '..';

const updateClient = async (
  clientId: string,
  clientDto: ClientDto
): Promise<Client> => {
  const response = await instance.patch<Client>(
    `/client/${clientId}`,
    clientDto
  );
  return response.data;
};

export default updateClient;
