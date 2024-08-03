import instance from '..';

const deleteTask = async (taskId: string) => {
  await instance.delete(`/task/${taskId}`);
  return taskId;
};

export default deleteTask;
