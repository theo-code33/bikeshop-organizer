import { ProductCategory } from '@bikeshop-organizer/types';
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
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useShop } from '../../context/ShopContext/ShopContext';
import deleteProductCategory from '../../utils/api/productCategory/delete-product-category';
import createProductCategory from '../../utils/api/productCategory/create-product-category';
import updateProductCategory from '../../utils/api/productCategory/update-product-category';

const ProductCategoryFormDialog = ({
  open,
  onClose,
  currentProductCategory,
}: {
  open: boolean;
  onClose: () => void;
  currentProductCategory?: ProductCategory;
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
    if (currentProductCategory) {
      try {
        const productCategoryUpdated = await updateProductCategory(
          currentProductCategory.id,
          { name }
        );
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            categories: prevShop.categories?.map((category) => {
              if (category.id === productCategoryUpdated.id) {
                return productCategoryUpdated;
              }
              return category;
            }),
          };
        });
        enqueueSnackbar('Catégorie modifiée avec succès', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la modification de la catégorie', {
          variant: 'error',
        });
      }
    } else {
      try {
        const productCategoryCreated = await createProductCategory({
          name,
          shop: { id: shop.id },
        });
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            categories: [
              ...(prevShop.categories || []),
              productCategoryCreated,
            ],
          };
        });
        handleClose();
        enqueueSnackbar('Catégorie créée avec succès', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la création de la catégorie', {
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

  const handleDeleteProductCategory = async () => {
    if (!currentProductCategory) return;
    try {
      const categoryId = await deleteProductCategory(currentProductCategory.id);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          categories: prevShop.categories?.filter(
            (category) => category.id !== categoryId
          ),
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
    if (currentProductCategory) {
      setValue('name', currentProductCategory.name);
    }
  }, [currentProductCategory, setValue]);

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
                title={
                  currentProductCategory
                    ? 'Modifier la catégorie'
                    : 'Créer une catégorie'
                }
                titleVariant="h4"
              />
              {currentProductCategory && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer la catégorie
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
              {currentProductCategory ? 'Modifier' : 'Créer la catégorie'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer cette catégorie ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer cette
            catégorie.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProductCategory}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCategoryFormDialog;
