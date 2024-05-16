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
import { useSnackbar } from 'notistack';
import updateUser from '../../utils/api/user/updateUser';
import { User } from '@bikeshop-organizer/types';
import { AUTH_TOKEN_KEY } from '../../context/AuthContext/types';

const UpdateUserInformationForm = () => {
  const { control, handleSubmit } = useForm();
  const { user, setUser, setToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data: Partial<User>) => {
    if (!user || !data) return;
    try {
      const updatedUser = await updateUser({ ...data, id: user.id });
      if ('token' in updatedUser) {
        setUser(updatedUser.user);
        setToken(updatedUser.token);
        localStorage.setItem(AUTH_TOKEN_KEY, updatedUser.token);
      } else {
        setUser(updatedUser);
      }
      enqueueSnackbar('Vos informations ont été modifiées', {
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
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Stack gap="10px" alignItems="flex-end">
        <Typography variant="h5" width="100%" color="primary.xdark">
          Modifier mes informations
        </Typography>
        <Stack gap="10px" direction="row" width="100%">
          <Controller
            name="firstName"
            control={control}
            defaultValue={user?.firstName}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
            defaultValue={user?.lastName}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Box width="100%">
                <InputLabel htmlFor="email" required>
                  Email
                </InputLabel>
                <TextField
                  type="text"
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
        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateUserInformationForm;
