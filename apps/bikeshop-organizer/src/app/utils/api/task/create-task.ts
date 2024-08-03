import instance from '..';
import { TaskDto } from './types';

const createTask = async (task: TaskDto) => {
  const response = await instance.post('/task', task);
  return response.data;
};

export default createTask;
