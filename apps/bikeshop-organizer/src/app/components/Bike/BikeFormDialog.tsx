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
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Title from '../Title/Title';
import { useEffect, useState } from 'react';
import { Bike, Brand } from '@bikeshop-organizer/types';
import getBrandsByShopId from '../../utils/api/brand/get-brands-by-shop-id';
import { useShop } from '../../context/ShopContext/ShopContext';
import { MuiColorInput } from 'mui-color-input';
import { enqueueSnackbar } from 'notistack';
import generateError from '../../utils/error/error';
import { CreateBikeDto } from '../../utils/api/bike/types';
import createBike from '../../utils/api/bike/create-bike';
import deleteBike from '../../utils/api/bike/delete-bike';
import updateBike from '../../utils/api/bike/update-bike';

const BikeFormDialog = ({
  open,
  onClose,
  currentBike,
  clientId,
  setBikes,
  setCurrentBike,
}: {
  open: boolean;
  onClose: () => void;
  currentBike?: Bike | CreateBikeDto | null;
  clientId?: string;
  setBikes: React.Dispatch<React.SetStateAction<Bike[] | CreateBikeDto[]>>;
  setCurrentBike: React.Dispatch<
    React.SetStateAction<Bike | CreateBikeDto | undefined>
  >;
}) => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  const { handleSubmit, control, setValue } = useForm();
  const { shop, setShop } = useShop();

  const handleClose = () => {
    setValue('model', '');
    setValue('color', '');
    setValue('bicycode', '');
    setValue('brand', '');
    setCurrentBike(undefined);
    onClose();
  };

  const fetchBrands = async () => {
    if (!shop) return;
    try {
      const fetchedBrands = await getBrandsByShopId(shop.id);
      setBrands(fetchedBrands);
    } catch (error) {
      console.error(error);
      setBrands([]);
    }
  };

  const onSubmit = async (data: unknown) => {
    const { model, color, bicycode, brand } = data as {
      model: string;
      color: string;
      bicycode: string;
      brand: string;
    };
    const newBike: CreateBikeDto = {
      brand: {
        id: brand as string,
        name: brands.find((b) => b.id === brand)?.name,
      },
      model: model as string,
      bicycode: bicycode as string,
      color: color as string,
      client: clientId ? { id: clientId as string } : undefined,
    };
    try {
      if (currentBike) {
        if ('id' in currentBike) {
          const updatedBike = await updateBike(currentBike.id, newBike);
          setBikes((prevBikes) => {
            if (!prevBikes) return [];
            return prevBikes.map((bike) =>
              (bike as Bike).id === updatedBike.id ? updatedBike : bike
            );
          });
          setShop((prevShop) => {
            if (!prevShop) return prevShop;
            return {
              ...prevShop,
              clients: prevShop.clients?.map((client) => {
                if (!client.bikes) return client;
                return {
                  ...client,
                  bikes: client.bikes.map((bike) =>
                    (bike as Bike).id === updatedBike.id ? updatedBike : bike
                  ),
                };
              }),
            };
          });
          enqueueSnackbar('Vélo modifié', { variant: 'success' });
        } else {
          setBikes((prevBikes) => {
            if (!prevBikes) return [];
            const currentBikeIndex = prevBikes.findIndex(
              (bike) => bike === currentBike
            );
            return prevBikes.map((bike, index) =>
              index === currentBikeIndex ? newBike : bike
            );
          });
        }
      } else if (clientId) {
        const bikeCreated = await createBike(newBike);
        setBikes((prevBikes) => {
          if (!prevBikes) return [];
          return [...prevBikes, bikeCreated];
        });
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            clients: prevShop.clients?.map((client) => {
              if (client.id === clientId) {
                return {
                  ...client,
                  bikes: [...(client.bikes || []), bikeCreated],
                };
              }
              return client;
            }),
          };
        });
        enqueueSnackbar('Vélo créé', { variant: 'success' });
      } else {
        setBikes((prevBikes) => {
          if (!prevBikes) return [];
          return [...prevBikes, newBike];
        });
        enqueueSnackbar('Vélo ajouté', { variant: 'success' });
      }
    } catch (error) {
      generateError(enqueueSnackbar, error, 'vélo', 'création');
    } finally {
      handleClose();
    }
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };
  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };
  const handleDeleteBike = async () => {
    if ((currentBike && !('id' in currentBike)) || !currentBike?.id) {
      setBikes((prevBikes) => {
        if (!prevBikes) return [];
        const currentBikeIndex = prevBikes.findIndex(
          (bike) => bike === currentBike
        );
        return prevBikes.filter((_, index) => index !== currentBikeIndex);
      });
      enqueueSnackbar('Vélo supprimé', { variant: 'success' });
    } else {
      if (!currentBike || !currentBike.id) return;
      try {
        const id = currentBike.id;
        const bikeIdDeleted = await deleteBike(id);
        setBikes((prevBikes) =>
          prevBikes.filter((bike) => (bike as Bike).id !== bikeIdDeleted)
        );
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            clients: prevShop.clients?.map((client) => {
              if (!client.bikes) return client;
              return {
                ...client,
                bikes: client.bikes.filter(
                  (bike) => (bike as Bike).id !== bikeIdDeleted
                ),
              };
            }),
          };
        });
        enqueueSnackbar('Vélo supprimé', { variant: 'success' });
      } catch (error) {
        generateError(enqueueSnackbar, error, 'vélo', 'suppression', false);
      } finally {
        handleClose();
        handleCloseConfirmDeleteModal();
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBrands();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop?.brands]);

  useEffect(() => {
    if (currentBike) {
      setValue('model', currentBike.model);
      setValue('color', currentBike.color);
      setValue('bicycode', currentBike.bicycode);
      setValue('brand', currentBike.brand.id);
    }
  }, [currentBike, setValue]);

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
                title={currentBike ? 'Modifier le vélo' : 'Créer un vélo'}
                titleVariant="h4"
              />
              {currentBike && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer le vélo
                </Button>
              )}
            </Stack>
            <Stack gap="32px" width="100%">
              <Stack direction="row" gap="10px">
                <Controller
                  name="model"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="model" required>
                          Modèle
                        </InputLabel>
                        <TextField
                          type="text"
                          id="model"
                          name="model"
                          fullWidth
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          required
                        />
                      </Box>
                    );
                  }}
                  rules={{ required: 'Champ requis' }}
                />
                <Controller
                  name="brand"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="brand" required>
                          Marque
                        </InputLabel>
                        <Select
                          id="brand"
                          name="brand"
                          value={value}
                          onChange={onChange}
                          fullWidth
                        >
                          {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    );
                  }}
                />
              </Stack>
              <Stack direction="row" gap="10px">
                <Controller
                  name="color"
                  control={control}
                  defaultValue={''}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="color" required>
                          Couleur
                        </InputLabel>
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
                <Controller
                  name="bicycode"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="bicycode">Bicycode</InputLabel>
                        <TextField
                          type="text"
                          id="bicycode"
                          name="bicycode"
                          fullWidth
                          onChange={onChange}
                          value={value}
                          error={!!error}
                        />
                      </Box>
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
              {currentBike ? 'Modifier' : 'Créer le vélo'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>Êtes-vous sûr de vouloir supprimer ce vélo ?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer ce
            vélo.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteBike}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BikeFormDialog;
