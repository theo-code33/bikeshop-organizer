import { Client } from '@bikeshop-organizer/types';
import instance from '..';
import { ClientDto } from './types';

const createClient = async (clientDto: ClientDto): Promise<Client> => {
  const response = await instance.post<Client>('/client', clientDto);
  return response.data;
};

export default createClient;
