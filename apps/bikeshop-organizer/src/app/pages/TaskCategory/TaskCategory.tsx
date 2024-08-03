import { useParams } from 'react-router-dom';
import MainLayout from '../../layout/Main/Main.layout';
import { Button, Stack } from '@mui/material';
import Title from '../../components/Title/Title';
import useTaskCategory from '../../utils/hook/useTaskCategory';
import { useState } from 'react';
import { Task } from '@bikeshop-organizer/types';
import TaskFormDialog from '../../components/Tasks/TaskFormDialog';
import AllTaskCategoryStatus from '../../components/TaskCategory/AllTaskCategoryStatus';
import TaskProvider from '../../context/TaskContext/TaskContext';

const TaskCategory = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>();

  const { id } = useParams<{ id: string }>();
  const { taskCategory } = useTaskCategory(id);

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setCurrentTask(undefined);
  };

  const handleOpenUpdateDialog = (task: Task) => {
    setOpenDialog(true);
    setCurrentTask(task as Task);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTask(undefined);
  };

  return (
    <MainLayout>
      {taskCategory ? (
        <TaskProvider taskCategoryId={taskCategory.id}>
          <>
            <Stack gap="50px">
              <Title title={taskCategory.name} />
              <Stack direction="row" justifyContent="flex-end">
                <Button variant="contained" onClick={handleOpenCreateDialog}>
                  Ajouter une {taskCategory.name.toLowerCase()}
                </Button>
              </Stack>
              <AllTaskCategoryStatus
                taskCategory={taskCategory}
                handleOpenUpdateDialog={handleOpenUpdateDialog}
              />
            </Stack>
            <TaskFormDialog
              open={openDialog}
              onClose={handleCloseDialog}
              currentTask={currentTask}
              taskCategory={taskCategory}
            />
          </>
        </TaskProvider>
      ) : (
        <div></div>
      )}
    </MainLayout>
  );
};

export default TaskCategory;
