import { TaskCategoryStatus } from '@bikeshop-organizer/types';
import { TaskCategoryStatusDto } from '../taskCategory/types';
import instance from '..';

const createTaskCategoryStatus = async (
  taskCategoryStatus: TaskCategoryStatusDto
): Promise<TaskCategoryStatus> => {
  const response = await instance.post(
    '/task-category-status',
    taskCategoryStatus
  );
  return response.data;
};

export default createTaskCategoryStatus;
