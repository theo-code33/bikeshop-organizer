import { Task } from '@bikeshop-organizer/types';
import { TaskDto } from './types';
import instance from '..';

const updateTask = async (
  taskId: string,
  task: Partial<TaskDto>
): Promise<Task> => {
  const response = await instance.patch<Task>(`/task/${taskId}`, task);
  return response.data;
};

export default updateTask;
