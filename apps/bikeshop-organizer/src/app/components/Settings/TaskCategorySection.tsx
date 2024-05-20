import { Button, Stack, Typography } from '@mui/material';
import {
  Shop,
  TaskCategory,
  TaskCategoryStatus,
} from '@bikeshop-organizer/types';
import { useState } from 'react';
import TaskCategoryFormDialog from '../TaskCategory/TaskCategoryFormDialog';
import TableCustom from '../TableCustom';

const TaskCategorySection = ({ shop }: { shop: Shop }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentTaskCategory, setCurrentTaskCategory] = useState<
    TaskCategory | undefined
  >();

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setCurrentTaskCategory(undefined);
  };
  const handleOpenUpdateDialog = (taskCategory: unknown) => {
    setOpenDialog(true);
    setCurrentTaskCategory(taskCategory as TaskCategory);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTaskCategory(undefined);
  };
  return (
    <>
      <Stack gap="32px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" color="primary.xdark">
            Mes Prestations
          </Typography>
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            Créer une prestation
          </Button>
        </Stack>
        {shop.taskCategories?.length === 0 ? (
          <Typography variant="body1" color="primary.xdark">
            Aucune prestation n'a été créée pour le moment.
          </Typography>
        ) : (
          <TableCustom
            datas={
              (shop.taskCategories as unknown as {
                id: string;
                name: string;
                taskCategoryStatus: string[];
              }[]) || []
            }
            onRowClick={handleOpenUpdateDialog}
            columns={[
              { key: 'name', label: 'Nom' },
              {
                key: 'taskCategoryStatus',
                label: 'Statut',
                render: (data) => {
                  return (
                    <Typography variant="body2">
                      {(
                        data as unknown as TaskCategory
                      ).taskCategoryStatus?.map(
                        (item: TaskCategoryStatus, i: number) => {
                          return (
                            item.status.name +
                            (i <
                            (data as unknown as TaskCategory)
                              .taskCategoryStatus!.length -
                              1
                              ? ' / '
                              : '')
                          );
                        }
                      )}
                    </Typography>
                  );
                },
              },
            ]}
          />
        )}
      </Stack>
      <TaskCategoryFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        currentTaskCategory={currentTaskCategory}
      />
    </>
  );
};

export default TaskCategorySection;
