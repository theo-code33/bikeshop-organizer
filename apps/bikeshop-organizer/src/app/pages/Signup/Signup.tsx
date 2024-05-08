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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const handleSignup = () => {
    if (!email) {
      console.log('Email is required');
      enqueueSnackbar('Email requis', { variant: 'error' });
      return;
    }
    if (!password) {
      console.log('Password is required');
      enqueueSnackbar('Mot de passe requis', { variant: 'error' });
      return;
    }
    console.log(email, password);
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
          src="/signup.png"
          alt="Signup background"
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
            <Box>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                type="email"
                id="email"
                name="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <TextField
                type="password"
                id="password"
                name="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
          >
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

export default Signup;
