import {
  Bike,
  Client,
  Product,
  Task,
  TaskCategory,
  TaskProductItem,
} from '@bikeshop-organizer/types';
import DrawerCustom from '../DrawerCustom/DrawerCustom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Title from '../Title/Title';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import useClients from '../../utils/hook/useClients';
import { useEffect, useState } from 'react';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import useProducts from '../../utils/hook/useProducts';
import TableCustom from '../TableCustom';
import dayjs from 'dayjs';
import { TaskDto } from '../../utils/api/task/types';
import createTask from '../../utils/api/task/create-task';
import generateError from '../../utils/error/error';
import { useTask } from '../../context/TaskContext/TaskContext';
import deleteTask from '../../utils/api/task/delete-task';
import updateTask from '../../utils/api/task/update-task';

const TaskFormDialog = ({
  open,
  onClose,
  taskCategory,
  currentTask,
}: {
  open: boolean;
  onClose: () => void;
  taskCategory: TaskCategory;
  currentTask?: Task;
}) => {
  const [clientSelected, setClientSelected] = useState<Client | undefined>();
  const [bikeSelected, setBikeSelected] = useState<Bike | undefined>();
  const [productsSelected, setProductsSelected] = useState<
    { product: Product; quantity: number }[] | TaskProductItem[]
  >([]);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { clients } = useClients();
  const { products } = useProducts();
  const { setTasks } = useTask();

  const handleClose = () => {
    setClientSelected(undefined);
    setBikeSelected(undefined);
    setProductsSelected([]);
    setValue('name', null);
    setValue('client', null);
    setValue('bike', null);
    setValue('startDate', null);
    setValue('endDate', null);
    onClose();
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };
  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };
  const handleDeleteTask = async () => {
    if (!currentTask) return;
    try {
      const taskId = await deleteTask(currentTask.id);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      enqueueSnackbar('Tâche supprimée avec succès', { variant: 'success' });
      handleCloseConfirmDeleteModal();
      handleClose();
    } catch (error) {
      generateError(enqueueSnackbar, error, 'tâche', 'suppression', true);
    }
  };

  const handleRemoveClient = () => {
    handleRemoveBike();
    setClientSelected(undefined);
    setValue('client', null);
  };
  const handleRemoveBike = () => {
    setBikeSelected(undefined);
    setValue('bike', null);
  };
  const handleRemoveProduct = (index: number) => {
    setProductsSelected((prev) => prev.filter((product, i) => i !== index));
  };

  const onSubmit = async (data: unknown) => {
    const { name, client, bike, startDate, endDate } = data as {
      name: string;
      client: string;
      bike: string;
      startDate: string;
      endDate: string;
    };
    if (!client || client === '') {
      enqueueSnackbar('Veuillez sélectionner un client', { variant: 'error' });
      return;
    }
    if (!bike || bike === '') {
      enqueueSnackbar('Veuillez sélectionner un vélo', { variant: 'error' });
      return;
    }
    const formattedStartDate = dayjs(startDate).format();
    if (formattedStartDate === 'Invalid date') {
      enqueueSnackbar('Veuillez sélectionner une date de réception', {
        variant: 'error',
      });
      return;
    }

    const formattedEndDate = dayjs(endDate).format();
    if (formattedEndDate === 'Invalid date') {
      enqueueSnackbar('Veuillez sélectionner une date de livraison', {
        variant: 'error',
      });
      return;
    }
    if (currentTask) {
      const updatedTask: TaskDto = {
        name: name,
        taskCategory: taskCategory,
        taskCategoryStatus: {
          id: currentTask.taskCategoryStatus.id,
        },
        bike: bikeSelected as Bike,
        client: clientSelected as Client,
        endDate: formattedEndDate,
      };
      if (startDate) updatedTask.startDate = formattedStartDate;
      if (productsSelected.length > 0)
        updatedTask.products = productsSelected.map((product) => {
          if ('id' in product) {
            return product;
          } else {
            return {
              product: { id: product.product.id },
              quantity: product.quantity || 1,
            };
          }
        });

      const taskUpdated = await updateTask(currentTask.id, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskUpdated.id ? taskUpdated : task))
      );
      if (taskUpdated.products) {
        setProductsSelected(taskUpdated.products);
      }
      enqueueSnackbar('Tâche modifiée avec succès', { variant: 'success' });
    } else {
      try {
        const newTask: TaskDto = {
          name: name,
          taskCategory: taskCategory,
          taskCategoryStatus: {
            id: taskCategory.taskCategoryStatus!.find(
              (status) => status.order === 1
            )!.id,
          },
          bike: bikeSelected as Bike,
          client: clientSelected as Client,
          endDate: formattedEndDate,
        };
        if (startDate) newTask.startDate = formattedStartDate;
        if (productsSelected.length > 0)
          newTask.products = productsSelected.map((product) => ({
            product: { id: product.product.id },
            quantity: product.quantity || 1,
          }));
        const taskCreated = await createTask(newTask);
        setTasks((prev) => [taskCreated, ...prev]);
        enqueueSnackbar('Tâche créée avec succès', { variant: 'success' });
      } catch (error) {
        generateError(enqueueSnackbar, error, 'tâche', 'création', true);
      } finally {
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (currentTask) {
      setValue('name', currentTask.name);
      setValue('client', currentTask.client.id);
      setValue('bike', currentTask.bike.id);
      setValue('startDate', currentTask.startDate.split('T')[0]);
      setValue('endDate', currentTask.endDate.split('T')[0]);
      setProductsSelected(currentTask.products || []);
      setClientSelected(currentTask.client);
      setBikeSelected(currentTask.bike);
    }
  }, [currentTask, setValue]);

  return (
    <>
      <DrawerCustom open={open} handleClose={handleClose}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack gap="50px" mb="50px">
            <Stack
              width="100%"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                width="20%"
                height="10px"
                borderRadius="20px"
                bgcolor={
                  currentTask
                    ? currentTask.taskCategoryStatus.status.color
                    : taskCategory.taskCategoryStatus?.find(
                        (status) => status.order === 1
                      )?.status.color || '#FFF'
                }
              />
            </Stack>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Title
                title={currentTask ? 'Modifier la tâche' : 'Ajouter une tâche'}
                titleVariant="h4"
              />
              {currentTask && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer la tâche
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
                        Titre
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
              />
              <Stack gap="15px">
                <Divider />
                <Typography variant="overline">
                  Client{' '}
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    *
                  </span>
                </Typography>
                <Controller
                  name="client"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="client"
                        name="client"
                        value={''}
                        onChange={(e) => {
                          onChange(e);
                          if (e.target.value !== clientSelected?.id) {
                            setBikeSelected(undefined);
                          }
                          setClientSelected(
                            clients.find(
                              (client) => client.id === e.target.value
                            )
                          );
                        }}
                      >
                        {clients.map((client) => (
                          <MenuItem key={client.id} value={client.id}>
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              {client.firstName} {client.lastName}
                            </span>{' '}
                            - {client.phoneNumber} - {client.email} -{' '}
                            {client.address}
                            {', '}
                            {client.postalCode} {client.city}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
                {clientSelected && (
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Typography variant="body1">
                      <span
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clientSelected.firstName} {clientSelected.lastName}
                      </span>{' '}
                      - {clientSelected.phoneNumber} - {clientSelected.email} -{' '}
                      {clientSelected.address}
                      {', '}
                      {clientSelected.postalCode} {clientSelected.city}
                    </Typography>
                    <IconButton color="error" onClick={handleRemoveClient}>
                      <IconTrash size={20} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
              <Stack gap="15px">
                <Divider />
                <Typography variant="overline">
                  Vélo{' '}
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    *
                  </span>
                </Typography>
                <Controller
                  name="bike"
                  control={control}
                  defaultValue={[]}
                  disabled={!clientSelected}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="bike"
                        name="bike"
                        value={''}
                        onChange={(e) => {
                          onChange(e);
                          setBikeSelected(
                            clientSelected?.bikes?.find(
                              (bike) => bike.id === e.target.value
                            )
                          );
                        }}
                        disabled={!clientSelected}
                      >
                        {clientSelected?.bikes?.map((bike) => (
                          <MenuItem key={bike.id} value={bike.id}>
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              {bike.brand.name}
                            </span>{' '}
                            - {bike.model} -{' '}
                            <span
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: bike.color,
                                display: 'inline-block',
                                marginLeft: '5px',
                              }}
                            ></span>
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
                {bikeSelected && (
                  <Stack direction="row" gap="10px" alignItems="center">
                    <Typography
                      variant="body1"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {bikeSelected.brand.name}
                      </span>{' '}
                      - {bikeSelected.model} -{' '}
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: bikeSelected.color,
                          display: 'inline-block',
                          marginLeft: '5px',
                        }}
                      ></span>
                    </Typography>
                    <IconButton color="error" onClick={handleRemoveBike}>
                      <IconTrash size={20} />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
              <Stack gap="15px">
                <Divider />
                <Typography variant="overline">Produits</Typography>
                <Controller
                  name="products"
                  control={control}
                  defaultValue={[]}
                  disabled={!clientSelected}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="products"
                        name="products"
                        value={''}
                        onChange={(e) => {
                          onChange(e);
                          setProductsSelected((prev) => {
                            const product = products.find(
                              (product) => product.id === e.target.value
                            );
                            if (!product) return prev;
                            if (prev.find((p) => p.product.id === product.id)) {
                              return prev.map((p) => {
                                if (p.product.id === product.id) {
                                  return {
                                    ...p,
                                    quantity: p.quantity + 1,
                                  };
                                }
                                return p;
                              });
                            }
                            return [...prev, { product: product, quantity: 1 }];
                          });
                        }}
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              {product.brand && `${product.brand.name} -`}{' '}
                            </span>{' '}
                            {product.name} - {product.price} €
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
                {productsSelected.length > 0 && (
                  <TableCustom
                    datas={productsSelected.map((product, index) => {
                      if (!product.product) productsSelected.splice(index, 1);
                      return {
                        index: index,
                        id: product.product.id,
                        name: product.product.name,
                        productCategory:
                          product.product.category?.name || 'Non défini',
                        price: product.product.price,
                        brand: product.product.brand?.name || 'Non défini',
                        quantity: product.quantity,
                      };
                    })}
                    onRowClick={() => void 0}
                    columns={[
                      {
                        key: 'name',
                        label: 'Nom',
                      },
                      {
                        key: 'productCategory',
                        label: 'Catégorie',
                        render: (data) => (
                          <Typography variant="body2">
                            {data.productCategory}
                          </Typography>
                        ),
                      },
                      {
                        key: 'quantity',
                        label: 'Quantité',
                        render: (data) => (
                          <Stack direction="row" gap="2px" alignItems="center">
                            <IconButton
                              disabled={(data.quantity as number) <= 1}
                              onClick={() => {
                                setProductsSelected((prev) =>
                                  prev.map((product, i) => {
                                    if (i === data.index) {
                                      return {
                                        product: product.product,
                                        quantity: product.quantity - 1,
                                      };
                                    }
                                    return product;
                                  })
                                );
                              }}
                            >
                              <IconMinus size={16} />
                            </IconButton>
                            <Typography variant="body2">
                              {data.quantity}
                            </Typography>
                            <IconButton>
                              <IconPlus
                                size={16}
                                onClick={() => {
                                  setProductsSelected((prev) =>
                                    prev.map((product, i) => {
                                      if (i === data.index) {
                                        return {
                                          ...product,
                                          quantity: product.quantity + 1,
                                        };
                                      }
                                      return product;
                                    })
                                  );
                                }}
                              />
                            </IconButton>
                          </Stack>
                        ),
                      },
                      {
                        key: 'price',
                        label: 'Prix',
                        render: (data) => (
                          <Typography variant="body2">
                            {data.price} €
                          </Typography>
                        ),
                      },
                      {
                        key: 'brand',
                        label: 'Marque',
                        render: (data) => (
                          <Typography variant="body2">{data.brand}</Typography>
                        ),
                      },
                      {
                        key: 'actions',
                        label: 'Actions',
                        render: (data) => (
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleRemoveProduct(data.index as number)
                            }
                          >
                            <IconTrash size={20} />
                          </IconButton>
                        ),
                      },
                    ]}
                  />
                )}
              </Stack>
              <Stack gap="15px">
                <Divider />
                <Typography variant="overline">Date de début</Typography>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={''}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        type="date"
                        id="startDate"
                        name="startDate"
                        fullWidth
                        onChange={onChange}
                        value={value}
                      />
                    );
                  }}
                />
              </Stack>
              <Stack gap="15px">
                <Divider />
                <Typography variant="overline">
                  Date de livraison{' '}
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    *
                  </span>
                </Typography>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={''}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        type="date"
                        id="endDate"
                        name="endDate"
                        fullWidth
                        onChange={onChange}
                        value={value}
                        required
                      />
                    );
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Button variant="text" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="contained">
              {currentTask ? 'Modifier' : 'Créer la tâche'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette tâche ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer cette
            tâche.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteTask}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskFormDialog;
