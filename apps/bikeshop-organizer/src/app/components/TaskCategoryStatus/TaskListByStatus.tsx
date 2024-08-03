import { Task, TaskCategoryStatus } from '@bikeshop-organizer/types';
import { Stack, Typography } from '@mui/material';
import TaskCard from '../Tasks/TaskCard';
import { useTask } from '../../context/TaskContext/TaskContext';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

const TaskListByStatus = ({
  taskCategoryStatus,
  handleOpenUpdateDialog,
}: {
  taskCategoryStatus: TaskCategoryStatus;
  handleOpenUpdateDialog: (task: Task) => void;
}) => {
  const { tasks } = useTask();

  return (
    <Stack gap="20px">
      <Stack
        direction="row"
        justifyContent="space-between"
        py="10px"
        px="20px"
        bgcolor={taskCategoryStatus.status.color}
        borderRadius="16px"
        minWidth="350px"
      >
        <Typography variant="h6" color="#FFF">
          {taskCategoryStatus.status.name}
        </Typography>
      </Stack>
      <Droppable droppableId={taskCategoryStatus.id}>
        {(provided: DroppableProvided) => (
          <Stack
            gap="10px"
            minHeight="100%"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks
              .filter(
                (el) => el.taskCategoryStatus.id === taskCategoryStatus.id
              )
              .map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleOpenUpdateDialog={handleOpenUpdateDialog}
                  index={index}
                />
              ))}
            {provided.placeholder as JSX.Element}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default TaskListByStatus;
