import instance from '..';

const deleteTaskCategoryStatus = async (taskCategoryStatusId: string) => {
  await instance.delete(`/task-category-status/${taskCategoryStatusId}`);
  return taskCategoryStatusId;
};

export default deleteTaskCategoryStatus;
