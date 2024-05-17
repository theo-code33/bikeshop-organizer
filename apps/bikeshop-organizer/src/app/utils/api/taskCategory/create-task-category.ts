import instance from '..';
import { TaskCategoryDto } from './types';

const createTaskCategory = async (taskCategory: TaskCategoryDto) => {
  const response = await instance.post('/task-category', taskCategory);
  return response.data;
};

export default createTaskCategory;
