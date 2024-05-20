import instance from '..';

const deleteClient = async (clientId: string) => {
  await instance.delete(`/client/${clientId}`);
  return clientId;
};

export default deleteClient;
