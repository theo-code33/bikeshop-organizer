import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import resetPassword from '../../utils/api/auth/reset-password';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ token }: { token: string }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { logOut } = useAuth();

  const handleResetPassword = async () => {
    if (!password) {
      enqueueSnackbar('Mot de passe requis', { variant: 'error' });
      return;
    }
    if (!confirmPassword) {
      enqueueSnackbar('Confirmation du mot de passe requis', {
        variant: 'error',
      });
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Les mots de passe ne correspondent pas', {
        variant: 'error',
      });
      return;
    }
    try {
      await resetPassword(token, password);
      logOut();
      enqueueSnackbar('Mot de passe réinitialisé avec succès', {
        variant: 'success',
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la réinitialisation du mot de passe', {
        variant: 'error',
      });
    }
  };
  return (
    <>
      <Stack alignItems="center" gap="5px">
        <Typography variant="h2" color="neutralDark.100" textAlign="center">
          Réinitialiser votre mot de passe
        </Typography>
      </Stack>
      <Stack width="100%" gap="20px">
        <Box>
          <InputLabel htmlFor="password">Mot de Passe</InputLabel>
          <TextField
            type="password"
            id="password"
            name="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Box>
          <InputLabel htmlFor="confirmPassword">
            Confirmation Mot de Passe
          </InputLabel>
          <TextField
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleResetPassword}
      >
        Réinitialiser
      </Button>
    </>
  );
};

export default ResetPassword;
