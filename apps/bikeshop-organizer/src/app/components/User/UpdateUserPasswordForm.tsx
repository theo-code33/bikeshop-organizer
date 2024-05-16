import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext/AuthContext';
import updateUser from '../../utils/api/user/updateUser';
import { useSnackbar } from 'notistack';

const UpdateUserPasswordForm = () => {
  const { control, handleSubmit, setValue } = useForm();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!user || !data) return;
    try {
      if (data.password !== data.confirmPassword) {
        enqueueSnackbar('Les nouveaux mots de passe ne correspondent pas', {
          variant: 'error',
        });
        return;
      }
      await updateUser({
        password: data.password,
        id: user.id,
      });
      setValue('password', '');
      setValue('confirmPassword', '');
      enqueueSnackbar('Votre mot de passe a été modifié', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la modification de vos informations', {
        variant: 'error',
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(
          data as {
            password: string;
            confirmPassword: string;
          }
        )
      )}
    >
      <Stack gap="10px" alignItems="flex-end">
        <Typography variant="h5" width="100%" color="primary.xdark">
          Modifier mon mot de passe
        </Typography>
        <Stack gap="10px" direction="row" width="100%">
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Box width="100%">
                  <InputLabel htmlFor="password" required>
                    Nouveau Mot de Passe
                  </InputLabel>
                  <TextField
                    type="password"
                    id="password"
                    name="password"
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
            name="confirmPassword"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Box width="100%">
                  <InputLabel htmlFor="confirmPassword" required>
                    Confirmation Nouveau Mot de Passe
                  </InputLabel>
                  <TextField
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
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
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateUserPasswordForm;
