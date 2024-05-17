import DrawerCustom from '../DrawerCustom/DrawerCustom';
import { Controller, DeepPartial, useForm } from 'react-hook-form';
import Title from '../Title/Title';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Shop,
  Status,
  TaskCategory,
  TaskCategoryStatus,
} from '@bikeshop-organizer/types';
import { CSSProperties, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import getStatusesByShopId from '../../utils/api/status/get-statuses-by-shop-id';
import { useShop } from '../../context/ShopContext/ShopContext';
import { useSnackbar } from 'notistack';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import {
  TaskCategoryDto,
  TaskCategoryStatusDto,
} from '../../utils/api/taskCategory/types';
import createTaskCategory from '../../utils/api/taskCategory/create-task-category';
import deleteTaskCategory from '../../utils/api/taskCategory/delete-task-category';
import deleteTaskCategoryStatus from '../../utils/api/taskCategoryStatus/delete-task-category-status';
import updateTaskCategory from '../../utils/api/taskCategory/update-task-category';
import createTaskCategoryStatus from '../../utils/api/taskCategoryStatus/create-task-category-status';
import updateTaskCategoryStatus from '../../utils/api/taskCategoryStatus/update-task-category-status';

const TaskCategoryFormDialog = ({
  open,
  onClose,
  currentTaskCategory,
}: {
  open: boolean;
  onClose: () => void;
  currentTaskCategory?: TaskCategory;
}) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [initialSelectedStatuses, setInitialSelectedStatuses] =
    useState<Partial<TaskCategoryStatus>[]>();
  const [selectedStatuses, setSelectedStatuses] = useState<
    Partial<TaskCategoryStatus>[]
  >([]);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const { control, handleSubmit, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { shop, setShop } = useShop();

  const handleCloseDrawer = () => {
    onClose();
    setValue('name', '');
    setSelectedStatuses([]);
  };

  const checkIfStatusesChanged = async () => {
    if (!initialSelectedStatuses) return;
    if (selectedStatuses.length !== initialSelectedStatuses.length) {
      if (!currentTaskCategory) return;
      for (const taskCategoryStatus of selectedStatuses) {
        const status = initialSelectedStatuses.find(
          (initialTaskCategoryStatus) =>
            taskCategoryStatus.status?.id ===
            initialTaskCategoryStatus.status?.id
        );
        if (!status) {
          const index = selectedStatuses.indexOf(taskCategoryStatus);
          const missingTaskCategoryStatus = selectedStatuses[index];
          const createdTaskCategoryStatus = await createTaskCategoryStatus({
            status: missingTaskCategoryStatus.status!.id as DeepPartial<Status>,
            order: missingTaskCategoryStatus.order || 0,
            taskCategory: { id: currentTaskCategory.id },
          });
          setSelectedStatuses((prev) => {
            if (!prev) return [];
            return prev.map((item) =>
              item.status?.id === createdTaskCategoryStatus.status?.id
                ? createdTaskCategoryStatus
                : item
            );
          });
        } else {
          const updatedTaskCategoryStatus = await updateTaskCategoryStatus({
            id: taskCategoryStatus.id!,
            order: taskCategoryStatus.order || 0,
          });
          setSelectedStatuses((prev) => {
            if (!prev) return [];
            return prev
              .map((item) =>
                item.id === updatedTaskCategoryStatus.id
                  ? updatedTaskCategoryStatus
                  : item
              )
              .sort((a, b) => a.order! - b.order!);
          });
        }
      }
    } else {
      selectedStatuses.sort((a, b) => a.order! - b.order!);
      for (let index = 0; index < selectedStatuses.length; index++) {
        const initialSelectedStatusesItem = initialSelectedStatuses[index];
        const selectedStatusesItem = selectedStatuses[index];
        if (initialSelectedStatusesItem.id !== selectedStatusesItem.id) {
          if (
            initialSelectedStatuses.find(
              (item) => item.status?.id === selectedStatusesItem.status?.id
            )
          ) {
            const updatedTaskCategoryStatus = await updateTaskCategoryStatus({
              id: selectedStatusesItem.id!,
              order: selectedStatusesItem.order || 0,
            });
            setSelectedStatuses((prev) => {
              if (!prev) return [];
              return prev
                .map((item) =>
                  item.id === updatedTaskCategoryStatus.id
                    ? updatedTaskCategoryStatus
                    : item
                )
                .sort((a, b) => a.order! - b.order!);
            });
          } else {
            if (!currentTaskCategory) return;
            const createdTaskCategoryStatus = await createTaskCategoryStatus({
              status: selectedStatusesItem.status!.id as DeepPartial<Status>,
              order: selectedStatusesItem.order || 0,
              taskCategory: { id: currentTaskCategory.id },
            });
            setSelectedStatuses((prev) => {
              if (!prev) return [];
              return prev.map((item) =>
                item.status?.id === createdTaskCategoryStatus.status?.id
                  ? createdTaskCategoryStatus
                  : item
              );
            });
          }
        }
      }
    }
  };

  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    if (selectedStatuses.length === 0) {
      enqueueSnackbar('Veuillez ajouter au moins un statut', {
        variant: 'error',
      });
      return;
    }
    const { name } = data as { name: string };
    if (currentTaskCategory) {
      try {
        await checkIfStatusesChanged();
        const updatedTaskCategory = await updateTaskCategory({
          name: name ?? currentTaskCategory.name,
          id: currentTaskCategory.id,
        });
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            taskCategories: prevShop.taskCategories?.map((taskCategory) =>
              taskCategory.id === updatedTaskCategory.id
                ? updatedTaskCategory
                : taskCategory
            ),
          };
        });
        enqueueSnackbar('Prestation modifiée avec succès', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la modification de la prestation', {
          variant: 'error',
        });
      }
    } else {
      try {
        const taskCategoryStatusDto: Partial<TaskCategoryStatusDto>[] =
          selectedStatuses.map((status) => ({
            status: status.status!.id as DeepPartial<Status>,
            order: status.order || 0,
          }));
        const taskCategoryDto: TaskCategoryDto = {
          name,
          taskCategoryStatus: taskCategoryStatusDto,
          shop: shop.id as DeepPartial<Shop>,
        };
        const taskCategoryCreated = await createTaskCategory(taskCategoryDto);

        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            taskCategories: [
              ...(prevShop.taskCategories || []),
              taskCategoryCreated,
            ],
          };
        });
        enqueueSnackbar('Prestation créée avec succès', {
          variant: 'success',
        });
        handleCloseDrawer();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la création de la prestation', {
          variant: 'error',
        });
      }
    }
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const handleDeleteTaskCategory = async () => {
    try {
      if (!currentTaskCategory) return;
      const taskCategoryId = await deleteTaskCategory(currentTaskCategory.id);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          taskCategories: prevShop.taskCategories?.filter(
            (taskCategory) => taskCategory.id !== taskCategoryId
          ),
        };
      });
      enqueueSnackbar('Prestation supprimée', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la suppression de la prestation', {
        variant: 'error',
      });
    } finally {
      handleCloseConfirmDeleteModal();
      handleCloseDrawer();
    }
  };

  const handleAddStatus = (event: unknown) => {
    const { target } = event as { target: HTMLSelectElement };
    const status = statuses.find((status) => status.id === target.value);
    if (!status) return;
    if (selectedStatuses.find((s) => s.status?.id === status.id)) {
      enqueueSnackbar('Ce statut a déjà été ajouté', {
        variant: 'warning',
      });
      return;
    }
    setSelectedStatuses((prev) => {
      if (!prev) return [];
      return [
        ...prev,
        {
          status,
          order: prev.length + 1,
        },
      ];
    });
  };

  const handleRemoveStatus = async (
    taskCategoryStatus: Partial<TaskCategoryStatus>
  ) => {
    try {
      if (
        currentTaskCategory &&
        currentTaskCategory.taskCategoryStatus &&
        currentTaskCategory.taskCategoryStatus.find(
          (item) => item.id === taskCategoryStatus.id
        )
      ) {
        await deleteTaskCategoryStatus(taskCategoryStatus.id!);
        const deletedTaskCategoryStatusIndex =
          currentTaskCategory.taskCategoryStatus.findIndex(
            (item) => item.id === taskCategoryStatus.id
          );
        for (
          let i = deletedTaskCategoryStatusIndex;
          i < selectedStatuses.length;
          i++
        ) {
          if (selectedStatuses[i].id !== taskCategoryStatus.id) {
            await updateTaskCategoryStatus({
              id: selectedStatuses[i].id!,
              order: i,
            });
          }
        }
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            taskCategories: prevShop.taskCategories?.map((taskCategory) =>
              taskCategory.id === currentTaskCategory.id
                ? {
                    ...taskCategory,
                    taskCategoryStatus: taskCategory.taskCategoryStatus?.filter(
                      (item) => item.id !== taskCategoryStatus.id
                    ),
                  }
                : taskCategory
            ),
          };
        });
        enqueueSnackbar('Statut supprimé', {
          variant: 'success',
        });
      }
      const newStatuses = selectedStatuses.filter(
        (item) => item.status!.id !== taskCategoryStatus.status!.id
      );
      setSelectedStatuses(newStatuses);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la suppression du statut', {
        variant: 'error',
      });
    }
  };

  const reorder = (
    list: Partial<TaskCategoryStatus>[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((item, index) => {
      item.order = index + 1;
      return item;
    });
  };
  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      selectedStatuses,
      result.source.index,
      result.destination.index
    );

    setSelectedStatuses(items);
  };

  const fetchStatuses = async () => {
    if (!shop) return;
    try {
      const fetchedStatuses = await getStatusesByShopId(shop.id);
      setStatuses(fetchedStatuses);
    } catch (error) {
      console.error(error);
      setStatuses([]);
    }
  };

  useEffect(() => {
    if (currentTaskCategory) {
      setValue('name', currentTaskCategory.name);
      setSelectedStatuses(currentTaskCategory.taskCategoryStatus || []);
      setInitialSelectedStatuses(currentTaskCategory.taskCategoryStatus || []);
    }
  }, [currentTaskCategory, setValue]);

  useEffect(() => {
    (async () => {
      await fetchStatuses();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle?: DraggingStyle | NotDraggingStyle
  ): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '5px 10px',
    borderRadius: '15px',
    background: isDragging
      ? theme.palette.grey[300]
      : theme.palette.background.paper,
    // styles we need to apply on draggables
    ...(draggableStyle || {}),
  });

  return (
    <>
      <DrawerCustom open={open} handleClose={handleCloseDrawer}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack gap="50px">
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Title
                title={
                  currentTaskCategory
                    ? 'Modifier la prestation'
                    : 'Créer une prestation'
                }
                titleVariant="h4"
              />
              {currentTaskCategory && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer la prestation
                </Button>
              )}
            </Stack>
            <Stack gap="32px" width="100%">
              <Controller
                name="name"
                control={control}
                defaultValue={''}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <Box width="100%">
                      <InputLabel htmlFor="name" required>
                        Nom
                      </InputLabel>
                      <TextField
                        type="text"
                        id="name"
                        name="name"
                        fullWidth
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        required
                      />
                    </Box>
                  );
                }}
                rules={{
                  required: 'Champs requis',
                }}
              />
              <Stack gap="32px">
                <Typography variant="h6" color="primary.dark">
                  Statuts
                </Typography>
                <Controller
                  name="statuses"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="statuses"
                        name="statuses"
                        value={value}
                        onChange={handleAddStatus}
                      >
                        {statuses.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="statuses">
                    {(provided: DroppableProvided) => (
                      <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {selectedStatuses.map((item, index) => (
                          <Draggable
                            key={item.status?.id}
                            draggableId={item.status!.id}
                            index={index}
                          >
                            {(
                              provided: DraggableProvided,
                              snapshot: DraggableStateSnapshot
                            ) => (
                              <Stack
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                direction="row"
                                sx={{
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background:
                                      theme.palette.grey[100] + ' !important',
                                  },
                                  ...getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  ),
                                }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap="20px"
                                >
                                  <IconGripVertical />
                                  <Typography variant="body1">
                                    <span
                                      style={{
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {item.status!.name}
                                    </span>
                                    {item.status!.description &&
                                      ` - ${item.status!.description}`}
                                  </Typography>
                                  <Box
                                    sx={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      backgroundColor: item.status!.color,
                                    }}
                                  />
                                </Stack>
                                <IconButton
                                  color="error"
                                  onClick={() => handleRemoveStatus(item)}
                                >
                                  <IconTrash />
                                </IconButton>
                              </Stack>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder as JSX.Element}
                      </Stack>
                    )}
                  </Droppable>
                </DragDropContext>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Button variant="text" onClick={handleCloseDrawer}>
              Annuler
            </Button>
            <Button type="submit" variant="contained">
              {currentTaskCategory ? 'Modifier' : 'Créer la prestation'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette prestation ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer ce
            statut.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTaskCategory}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCategoryFormDialog;
