import { Task } from '@bikeshop-organizer/types';

export type TaskCtx = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  taskSelected: Task | undefined;
  setTaskSelected: React.Dispatch<React.SetStateAction<Task | undefined>>;
};
