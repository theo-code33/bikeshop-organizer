import instance from '..';

const deleteTaskCategory = async (taskCategoryId: string) => {
  await instance.delete(`/task-category/${taskCategoryId}`);
  return taskCategoryId;
};

export default deleteTaskCategory;
