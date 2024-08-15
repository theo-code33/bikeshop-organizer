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
import { Controller, useForm } from 'react-hook-form';
import { LoginDto } from '../../utils/api/auth/types';

const Login = () => {
  const { handleSubmit, control, setValue } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleLogin = async (data: unknown) => {
    const { email, password } = data as LoginDto;
    if (!email) {
      enqueueSnackbar('Email requis', { variant: 'error' });
      return;
    }
    if (!password) {
      enqueueSnackbar('Mot de passe requis', { variant: 'error' });
      return;
    }
    await login(email, password, setValue);
  };

  return (
    <AuthLayout imgSrc="/login.png">
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        <Stack alignItems="center" gap="5px">
          <Typography variant="h2" color="neutralDark.100">
            Connexion
          </Typography>
          <Typography
            variant="subtitle1"
            color="neutralDark.400"
            textAlign="center"
          >
            Bienvenue sur l’application qui te fera gagner du temps dans la
            gestion de ton atelier
          </Typography>
        </Stack>
        <Stack width="100%" gap="20px">
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
          <Stack gap="10px">
            <Controller
              name="password"
              control={control}
              defaultValue={''}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
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
            <Link variant="link" href="/reset-password" color="primary">
              Mot de passe oublié ?
            </Link>
          </Stack>
        </Stack>
        <Button variant="contained" color="primary" fullWidth type="submit">
          Se connecter
        </Button>
        <Link
          href="/signup"
          color="primary.light"
          sx={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
          }}
        >
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
