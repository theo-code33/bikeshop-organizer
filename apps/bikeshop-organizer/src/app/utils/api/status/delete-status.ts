import instance from '..';

const deleteStatus = async (statusId: string) => {
  await instance.delete(`/status/${statusId}`);
  return statusId;
};

export default deleteStatus;
