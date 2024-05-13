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
import { UserDto } from '@bikeshop-organizer/types';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();
  const { signup } = useAuth();

  const handleSignup = async () => {
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
      <>
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
            <InputLabel htmlFor="firstName">Prénom</InputLabel>
            <TextField
              type="text"
              id="firstName"
              name="firstName"
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Box>
          <Box>
            <InputLabel htmlFor="lastName">Nom</InputLabel>
            <TextField
              type="text"
              id="lastName"
              name="lastName"
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Box>
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
      </>
    </AuthLayout>
  );
};

export default Signup;
