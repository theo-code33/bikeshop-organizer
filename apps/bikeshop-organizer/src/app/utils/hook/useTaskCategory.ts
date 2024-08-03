import { TaskCategory } from '@bikeshop-organizer/types';
import { useEffect, useState } from 'react';
import getTaskCategory from '../api/taskCategory/get-task-category';

const useTaskCategory = (taskCategoryId: string | undefined) => {
  const [taskCategory, setTaskCategory] = useState<TaskCategory | undefined>();

  useEffect(() => {
    if (!taskCategoryId) return;
    getTaskCategory(taskCategoryId)
      .then((taskCategory) => {
        setTaskCategory(taskCategory);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskCategoryId]);

  return { taskCategory };
};

export default useTaskCategory;
