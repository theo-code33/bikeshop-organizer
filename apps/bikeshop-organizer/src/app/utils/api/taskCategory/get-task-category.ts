import { TaskCategory } from '@bikeshop-organizer/types';
import instance from '..';

const getTaskCategory = async (
  taskCategoryId: string
): Promise<TaskCategory> => {
  const response = await instance.get(`/task-category/${taskCategoryId}`);
  return response.data;
};

export default getTaskCategory;
