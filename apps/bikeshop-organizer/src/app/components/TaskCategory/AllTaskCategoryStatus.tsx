import { Task, TaskCategory } from '@bikeshop-organizer/types';
import { Stack } from '@mui/material';
import TaskListByStatus from '../TaskCategoryStatus/TaskListByStatus';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { useTask } from '../../context/TaskContext/TaskContext';
import updateTask from '../../utils/api/task/update-task';
import generateError from '../../utils/error/error';
import { enqueueSnackbar } from 'notistack';

const AllTaskCategoryStatus = ({
  taskCategory,
  handleOpenUpdateDialog,
}: {
  taskCategory: TaskCategory;
  handleOpenUpdateDialog: (task: Task) => void;
}) => {
  const { tasks, setTasks } = useTask();
  const onDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === result.source.droppableId) {
      return;
    }
    const task = tasks.find((el) => el.id === result.draggableId);
    if (!task) {
      return;
    }
    const updateTaskDto = {
      taskCategoryStatus: { id: result.destination.droppableId },
    };

    try {
      setTasks((prevTasks) =>
        prevTasks.map((el) =>
          el.id === task.id ? ({ ...task, ...updateTaskDto } as Task) : el
        )
      );
      const updatedTask = await updateTask(task.id, updateTaskDto);
      console.log(updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((el) => (el.id === updatedTask.id ? updatedTask : el))
      );
    } catch (error) {
      generateError(enqueueSnackbar, error, 'tâche', 'modifier', true);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        direction="row"
        gap="30px"
        sx={{
          overflowY: 'scroll',
        }}
      >
        {taskCategory.taskCategoryStatus?.map((categoryStatus) => (
          <TaskListByStatus
            key={categoryStatus.id}
            taskCategoryStatus={categoryStatus}
            handleOpenUpdateDialog={handleOpenUpdateDialog}
          />
        ))}
      </Stack>
    </DragDropContext>
  );
};

export default AllTaskCategoryStatus;
