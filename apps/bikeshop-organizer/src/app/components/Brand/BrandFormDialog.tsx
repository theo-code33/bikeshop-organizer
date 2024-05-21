import { Controller, useForm } from 'react-hook-form';
import DrawerCustom from '../DrawerCustom/DrawerCustom';
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
import { useEffect, useState } from 'react';
import { Brand } from '@bikeshop-organizer/types';
import { useSnackbar } from 'notistack';
import createBrand from '../../utils/api/brand/create-brand';
import { useShop } from '../../context/ShopContext/ShopContext';
import updateBrand from '../../utils/api/brand/update-brand';
import deleteBrand from '../../utils/api/brand/delete-brand';

const BrandFormDialog = ({
  open,
  onClose,
  currentBrand,
}: {
  open: boolean;
  onClose: () => void;
  currentBrand?: Brand;
}) => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const { shop, setShop } = useShop();

  const handleClose = () => {
    setValue('name', '');
    onClose();
  };

  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    const { name } = data as { name: string };
    if (currentBrand) {
      try {
        const brandUpdated = await updateBrand(currentBrand.id, { name });
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            brands: prevShop.brands?.map((brand) => {
              if (brand.id === brandUpdated.id) {
                return brandUpdated;
              }
              return brand;
            }),
          };
        });
        enqueueSnackbar('Marque modifiée avec succès', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la modification de la marque', {
          variant: 'error',
        });
      }
    } else {
      try {
        const brandCreated = await createBrand({ name, shop: { id: shop.id } });
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            brands: [...(prevShop.brands || []), brandCreated],
          };
        });
        enqueueSnackbar('Marque créée avec succès', { variant: 'success' });
        handleClose();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la création de la marque', {
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

  const handleDeleteBrand = async () => {
    if (!currentBrand) return;
    try {
      const brandId = await deleteBrand(currentBrand.id);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          brands: prevShop.brands?.filter((brand) => brand.id !== brandId),
        };
      });
      handleCloseConfirmDeleteModal();
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la suppression de la marque', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (currentBrand) {
      setValue('name', currentBrand.name);
    }
  }, [currentBrand, setValue]);

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
                title={currentBrand ? 'Modifier la marque' : 'Créer une marque'}
                titleVariant="h4"
              />
              {currentBrand && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer la marque
                </Button>
              )}
            </Stack>
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
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Button variant="text" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="contained">
              {currentBrand ? 'Modifier' : 'Créer la marque'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette marque ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer cette
            marque.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteBrand}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BrandFormDialog;
