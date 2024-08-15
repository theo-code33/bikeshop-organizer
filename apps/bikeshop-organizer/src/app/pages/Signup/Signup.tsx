import {
  Box,
  Button,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../context/AuthContext/AuthContext';
import AuthLayout from '../../layout/Auth/Auth.layout';
import { UserDto } from '@bikeshop-organizer/types';
import { Controller, useForm } from 'react-hook-form';

const Signup = () => {
  const { handleSubmit, control } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const { signup } = useAuth();

  const handleSignup = async (data: unknown) => {
    const { email, password, firstName, lastName } = data as UserDto;
    if (!email) {
      enqueueSnackbar('Email requis', { variant: 'error' });
      return;
    }
    if (!password) {
      enqueueSnackbar('Mot de passe requis', { variant: 'error' });
      return;
    }
    if (!firstName) {
      enqueueSnackbar('Prénom requis', { variant: 'error' });
      return;
    }
    if (!lastName) {
      enqueueSnackbar('Nom requis', { variant: 'error' });
      return;
    }
    const userDto: UserDto = {
      email,
      password,
      firstName,
      lastName,
    };
    await signup(userDto);
  };

  return (
    <AuthLayout imgSrc="/signup.png">
      <form
        onSubmit={handleSubmit((data) => handleSignup(data))}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        <Stack alignItems="center" gap="5px">
          <Typography variant="h2" color="neutralDark.100">
            Bienvenue !
          </Typography>
          <Typography
            variant="subtitle1"
            color="neutralDark.400"
            textAlign="center"
          >
            À la recherche d’un outil qui vous permet de gérer plus facilement
            votre atelier ? Vous êtes au bon endroit !
          </Typography>
        </Stack>
        <Stack width="100%" gap="20px">
          <Controller
            name="firstName"
            control={control}
            defaultValue={''}
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
            defaultValue={''}
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
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
            name="password"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Box width="100%">
                  <InputLabel htmlFor="password" required>
                    Mot de passe
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
        </Stack>
        <Button variant="contained" color="primary" fullWidth type="submit">
          M'inscrire
        </Button>
        <Link
          href="/login"
          color="primary.light"
          sx={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
          }}
        >
          Déjà inscrit ? Connectez-vous
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Signup;
