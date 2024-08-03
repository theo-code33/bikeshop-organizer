import { createContext, useContext, useEffect, useState } from 'react';
import { TaskCtx } from './types';
import { Task } from '@bikeshop-organizer/types';
import getTasksByTaskCategory from '../../utils/api/task/get-tasks-by-task-category';

const TaskContext = createContext<TaskCtx>({
  tasks: [],
  setTasks: () => {},
  taskSelected: undefined,
  setTaskSelected: () => {},
});

const TaskProvider = ({
  taskCategoryId,
  children,
}: {
  taskCategoryId: string;
  children: JSX.Element;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskSelected, setTaskSelected] = useState<Task | undefined>(undefined);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasksByTaskCategory(taskCategoryId);
      setTasks(response);
    };

    fetchTasks();
  }, [taskCategoryId]);
  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
        taskSelected,
        setTaskSelected,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTask = () => {
  return useContext(TaskContext);
};
