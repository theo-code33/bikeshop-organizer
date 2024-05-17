import { TaskCategoryStatus } from '@bikeshop-organizer/types';
import instance from '..';
import { TaskCategoryStatusDto } from '../taskCategory/types';

const updateTaskCategoryStatus = async (
  taskCategoryStatus: Partial<TaskCategoryStatusDto> & { id: string }
): Promise<TaskCategoryStatus> => {
  const response = await instance.patch(
    `/task-category-status/${taskCategoryStatus.id}`,
    {
      order: taskCategoryStatus.order,
      status: taskCategoryStatus.status,
    }
  );
  return response.data;
};

export default updateTaskCategoryStatus;
