import { Task } from '@bikeshop-organizer/types';
import instance from '..';

const getTasksByTaskCategory = async (
  taskCategoryId: string
): Promise<Task[]> => {
  const response = await instance.get(`/task/task-category/${taskCategoryId}`);
  return response.data;
};

export default getTasksByTaskCategory;
