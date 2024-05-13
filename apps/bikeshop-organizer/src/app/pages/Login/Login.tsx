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
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import AuthLayout from '../../layout/Auth/Auth.layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email) {
      enqueueSnackbar('Email requis', { variant: 'error' });
      return;
    }
    if (!password) {
      enqueueSnackbar('Mot de passe requis', { variant: 'error' });
      return;
    }
    await login(email, password);
  };

  return (
    <AuthLayout imgSrc="/login.png">
      <>
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
          <Box>
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              type="email"
              id="email"
              name="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Stack gap="10px">
            <Box>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <TextField
                type="password"
                id="password"
                name="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Link variant="link" href="/reset-password" color="primary">
              Mot de passe oublié ?
            </Link>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
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
      </>
    </AuthLayout>
  );
};

export default Login;
