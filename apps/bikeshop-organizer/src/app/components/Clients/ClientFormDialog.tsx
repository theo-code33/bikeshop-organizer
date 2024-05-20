import { Client } from '@bikeshop-organizer/types';
import DrawerCustom from '../DrawerCustom/DrawerCustom';
import { Controller, useForm } from 'react-hook-form';
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
import { useShop } from '../../context/ShopContext/ShopContext';
import { useSnackbar } from 'notistack';
import { ClientDto } from '../../utils/api/client/types';
import createClient from '../../utils/api/client/create-client';
import deleteClient from '../../utils/api/client/delete-client';
import updateClient from '../../utils/api/client/update-client';
import { MuiTelInput } from 'mui-tel-input';
import getCityByPostalCode from '../../utils/postalCode/get-city-by-postal-code';

const ClientFormDialog = ({
  open,
  onClose,
  currentClient,
}: {
  open: boolean;
  onClose: () => void;
  currentClient?: Client;
}) => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);
  const [citiesOptions, setCitiesOptions] = useState<string[]>([]);

  const { handleSubmit, control, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const { shop, setShop } = useShop();

  const handleClose = () => {
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('phoneNumber', '');
    setValue('email', '');
    setValue('address', '');
    setValue('postalCode', '');
    setValue('city', '');
    setCitiesOptions([]);
    onClose();
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const handleDeleteClient = async () => {
    if (!currentClient) return;
    try {
      const clientId = await deleteClient(currentClient.id);
      setShop((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          clients: prev.clients?.filter((client) => client.id !== clientId),
        };
      });
      enqueueSnackbar('Client supprimé avec succès', {
        variant: 'success',
      });
      handleCloseConfirmDeleteModal();
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la suppression du client', {
        variant: 'error',
      });
    }
  };

  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      postalCode,
      city,
    } = data as ClientDto;

    let parsedPhoneNumber = phoneNumber as string;
    if (phoneNumber.length > 1 && phoneNumber.startsWith('0')) {
      parsedPhoneNumber = '+33' + phoneNumber.slice(1);
    }

    const newClient: ClientDto = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: parsedPhoneNumber,
      email: email,
      address: address,
      postalCode: postalCode,
      city: city,
      shop: { id: shop.id },
    };
    if (currentClient) {
      try {
        const cliendUpdated = await updateClient(currentClient.id, newClient);
        setShop((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            clients: prev.clients?.map((client) =>
              client.id === cliendUpdated.id ? cliendUpdated : client
            ),
          };
        });
        enqueueSnackbar('Client modifié avec succès', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la modification du client', {
          variant: 'error',
        });
      }
    } else {
      try {
        const clientCreated = await createClient(newClient);
        setShop((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            clients: [...(prev.clients || []), clientCreated],
          };
        });
        enqueueSnackbar('Client créé avec succès', {
          variant: 'success',
        });
        handleClose();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la création du client', {
          variant: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (currentClient) {
      setValue('firstName', currentClient.firstName);
      setValue('lastName', currentClient.lastName);
      setValue('email', currentClient.email);
      setValue('address', currentClient.address);
      setValue('postalCode', currentClient.postalCode);
      setValue('city', currentClient.city);
      if (currentClient.postalCode.length === 5) {
        getCityByPostalCode(currentClient.postalCode).then((cities) => {
          if (cities.includes(currentClient.city)) {
            setCitiesOptions([...cities]);
          } else {
            setCitiesOptions([currentClient.city, ...cities]);
          }
        });
      } else {
        setCitiesOptions([currentClient.city]);
      }
      if (
        currentClient.phoneNumber.length > 1 &&
        currentClient.phoneNumber.startsWith('0')
      ) {
        currentClient.phoneNumber = '+33' + currentClient.phoneNumber.slice(1);
      }
      setValue('phoneNumber', currentClient.phoneNumber);
    }
  }, [currentClient, setValue]);

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
                title={currentClient ? 'Modifier le client' : 'Créer un client'}
                titleVariant="h4"
              />
              {currentClient && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer le client
                </Button>
              )}
            </Stack>
            <Stack gap="32px" width="100%">
              <Stack direction="row" gap="10px">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="firstName" required>
                          Prénom
                        </InputLabel>
                        <TextField
                          type="text"
                          id="firstName"
                          name="firstName"
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
                  name="lastName"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="lastName" required>
                          Nom
                        </InputLabel>
                        <TextField
                          type="text"
                          id="lastName"
                          name="lastName"
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
              <Stack direction="row" gap="10px">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="email" required>
                          Email
                        </InputLabel>
                        <TextField
                          type="email"
                          id="email"
                          name="email"
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
                  name="phoneNumber"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="phoneNumber" required>
                          Téléphone
                        </InputLabel>
                        <MuiTelInput
                          id="phoneNumber"
                          name="phoneNumber"
                          value={value}
                          onChange={onChange}
                          fullWidth
                          error={!!error}
                          required
                          defaultCountry="FR"
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
            <Stack gap="10px">
              <Typography variant="h6" color="primary.dark">
                Adresse
              </Typography>
              <Stack gap="32px">
                <Controller
                  name="address"
                  control={control}
                  defaultValue={''}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <Box width="100%">
                        <InputLabel htmlFor="address" required>
                          Adresse
                        </InputLabel>
                        <TextField
                          type="text"
                          id="address"
                          name="address"
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
                <Stack direction="row" gap="10px">
                  <Controller
                    name="postalCode"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <Box width="100%">
                          <InputLabel htmlFor="postalCode" required>
                            Code Postal
                          </InputLabel>
                          <TextField
                            type="number"
                            id="postalCode"
                            name="postalCode"
                            fullWidth
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.length === 5) {
                                getCityByPostalCode(value).then((cities) => {
                                  setCitiesOptions(cities);
                                });
                              }
                              onChange(e);
                            }}
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
                    name="city"
                    control={control}
                    defaultValue={''}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <Box width="100%">
                          <InputLabel htmlFor="city" required>
                            Ville
                          </InputLabel>
                          {/* <TextField
                            type="text"
                            id="city"
                            name="city"
                            fullWidth
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            required
                          /> */}
                          <Select
                            value={value}
                            id="city"
                            onChange={onChange}
                            fullWidth
                            disabled={citiesOptions.length === 0 && !value}
                            error={!!error}
                          >
                            {citiesOptions.map((city) => (
                              <MenuItem key={city} value={city}>
                                {city}
                              </MenuItem>
                            ))}
                          </Select>
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
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Button variant="text" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="contained">
              {currentClient ? 'Modifier' : 'Créer le client'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer ce client ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer ce
            client.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteClient}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientFormDialog;
