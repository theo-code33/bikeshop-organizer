import { TaskCategory } from '@bikeshop-organizer/types';
import instance from '..';

const updateTaskCategory = async (
  taskCategory: Partial<TaskCategory>
): Promise<TaskCategory> => {
  const response = await instance.patch(`/task-category/${taskCategory.id}`, {
    name: taskCategory.name,
  });
  return response.data;
};

export default updateTaskCategory;
