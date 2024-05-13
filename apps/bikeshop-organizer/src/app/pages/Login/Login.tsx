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
    <Stack direction="row" width="100%" height="100vh" overflow="hidden">
      <Box
        sx={{
          width: '50%',
          height: '100%',
          backgroundColor: 'red',
        }}
      >
        <img
          src="/login.png"
          alt="Login background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Stack
        width="50%"
        alignItems="center"
        padding="50px"
        justifyContent="space-between"
      >
        <Box>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: '200px',
              height: '100px',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Stack alignItems="center" gap="50px" maxWidth="50%">
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
            href="/login"
            color="primary.light"
            sx={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
            }}
          >
            Pas encore de compte ? Inscrivez-vous
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <Stack gap="5px" direction="row" alignItems="center">
            <Link variant="link" href="/mentions-legales" color="#B6C2E2">
              Mentions Légales
            </Link>
            <Box
              sx={{
                width: '1px',
                height: '20px',
                borderRadius: '10px',
                backgroundColor: '#B6C2E2',
              }}
            />
            <Link variant="link" href="/cgu" color="#B6C2E2">
              CGU
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
