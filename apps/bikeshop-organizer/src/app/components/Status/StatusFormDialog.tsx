import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Title from '../Title/Title';
import { Controller, useForm } from 'react-hook-form';
import { MuiColorInput } from 'mui-color-input';
import { useSnackbar } from 'notistack';
import { useShop } from '../../context/ShopContext/ShopContext';
import createStatus from '../../utils/api/status/create-status';
import { Status } from '@bikeshop-organizer/types';
import DrawerCustom from '../DrawerCustom/DrawerCustom';
import { useEffect, useState } from 'react';
import updateStatus from '../../utils/api/status/update-status';
import deleteStatus from '../../utils/api/status/delete-status';
import generateError from '../../utils/error/error';

const StatusFormDialog = ({
  open,
  onClose,
  currentStatus,
}: {
  open: boolean;
  onClose: () => void;
  currentStatus?: Status;
}) => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const { control, handleSubmit, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { shop, setShop } = useShop();

  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    const { name, description, color } = data as {
      name: string;
      description: string;
      color: string;
    };
    if (!color) {
      return enqueueSnackbar('Veuillez choisir une couleur', {
        variant: 'error',
      });
    }
    if (currentStatus) {
      const statusDto = {
        name,
        description,
        color,
        id: currentStatus.id,
      };
      try {
        const updatedStatus = await updateStatus(statusDto);
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            taskCategories: prevShop.taskCategories?.map((taskCategory) => {
              return {
                ...taskCategory,
                taskCategoryStatus:
                  (taskCategory.taskCategoryStatus &&
                    taskCategory.taskCategoryStatus.map((item) =>
                      item.status.id === updatedStatus.id
                        ? { ...item, status: updatedStatus }
                        : item
                    )) ||
                  [],
              };
            }),
            status: prevShop.status?.map((status) =>
              status.id === updatedStatus.id ? updatedStatus : status
            ),
          };
        });
        enqueueSnackbar('Statut modifié', { variant: 'success' });
        onClose();
      } catch (error) {
        generateError(enqueueSnackbar, error, 'statut', 'modification', false);
      }
    } else {
      const statusDto = {
        name,
        description,
        color,
        shop: { id: shop.id },
      };

      try {
        const newStatus = await createStatus(statusDto);
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            status: [...(prevShop.status || []), newStatus],
          };
        });
        enqueueSnackbar('Statut créé', { variant: 'success' });
        onClose();
      } catch (error) {
        generateError(enqueueSnackbar, error, 'statut', 'création', false);
      }
    }
  };

  const handleClose = () => {
    setValue('name', '');
    setValue('description', '');
    setValue('color', '');
    onClose();
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const handleDeleteStatus = async () => {
    try {
      if (!currentStatus) return;
      const statusId = await deleteStatus(currentStatus.id);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          status: prevShop.status?.filter((status) => status.id !== statusId),
        };
      });
      enqueueSnackbar('Statut supprimé', { variant: 'success' });
    } catch (error) {
      generateError(enqueueSnackbar, error, 'statut', 'suppression', false);
    } finally {
      handleCloseConfirmDeleteModal();
      handleClose();
    }
  };

  useEffect(() => {
    setValue('name', currentStatus?.name || '');
    setValue('description', currentStatus?.description || '');
    setValue('color', currentStatus?.color || '');
  }, [currentStatus, setValue]);

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
          <Stack gap="50px">
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Title
                title={currentStatus ? 'Modifier le statut' : 'Créer un statut'}
                titleVariant="h4"
              />
              {currentStatus && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer le statut
                </Button>
              )}
            </Stack>
            <Stack gap="50px" alignItems="flex-end">
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
                <Controller
                  name="description"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="description">
                          Description
                        </InputLabel>
                        <TextField
                          type="text"
                          id="description"
                          name="description"
                          fullWidth
                          onChange={onChange}
                          value={value}
                          error={!!error}
                        />
                      </Box>
                    );
                  }}
                />
                <Controller
                  name="color"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="color">Couleur</InputLabel>
                        <MuiColorInput
                          format="hex"
                          value={value}
                          onChange={onChange}
                        />
                      </Box>
                    );
                  }}
                  rules={{
                    required: 'Champs requis',
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
              {currentStatus ? 'Modifier' : 'Créer le statut'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer ce statut ?
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
            onClick={handleDeleteStatus}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusFormDialog;
