import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Title from '../Title/Title';
import sendCreateShopEmail from '../../utils/api/mail/send-create-shop-email';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { ShopDto } from '../../utils/api/mail/types';

const UserWithoutShop = () => {
  const regexSIRET = /\d{14}/g;
  const { handleSubmit, control, reset } = useForm();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleSendCreateShopEmail = async (data: unknown) => {
    if (!user) return;

    try {
      await sendCreateShopEmail(user, data as ShopDto);
      enqueueSnackbar(
        'Votre demande a bien été envoyée, vous recevrez un email de confirmation dans les plus brefs délais.',
        {
          variant: 'success',
        }
      );
      reset();
    } catch (error) {
      enqueueSnackbar(
        'Une erreur est survenue lors de l’envoi de votre demande, veuillez réessayer plus tard.',
        {
          variant: 'error',
        }
      );
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => handleSendCreateShopEmail(data))}>
      <Stack gap="32px" alignItems="flex-start">
        <Title title="Vous n’avez pas encore de boutique" />
        <Typography variant="subtitle1" maxWidth="70vw">
          Pas de panique ! Vous n’avez pas encore de boutique mais il vous
          suffit simplement d’envoyer une demande d’ouverture de boutique via le
          formulaire ci-dessous. Un email automatique sera envoyé à un
          administrateur qui traitera votre demande et qui vous fera un retour
          par email dans les plus brefs délais.
        </Typography>
        <Stack gap="32px" width="100%">
          <Stack direction="row" gap="10px">
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
              name="siret"
              control={control}
              defaultValue={''}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <Box width="100%">
                    <InputLabel htmlFor="siret" required>
                      SIRET
                    </InputLabel>
                    <TextField
                      type="text"
                      id="siret"
                      name="siret"
                      fullWidth
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={
                        regexSIRET.test(value) === false && value
                          ? 'Veuillez un numéro SIRET valide'
                          : ''
                      }
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
          <Controller
            name="address"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
                      type="text"
                      id="postalCode"
                      name="postalCode"
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
                    <TextField
                      type="text"
                      id="city"
                      name="city"
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
        </Stack>
        <Stack width="100%" direction="row" justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Envoyer une demande
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UserWithoutShop;
