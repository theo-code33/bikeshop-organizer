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
import sendEmailresetPassword from '../../utils/api/auth/send-email-reset-password';
import { useNavigate } from 'react-router-dom';

const SendEmailResetPassword = () => {
  const [email, setEmail] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSendEmailResetPassword = async () => {
    if (!email) {
      enqueueSnackbar('Email requis', { variant: 'error' });
      return;
    }
    try {
      await sendEmailresetPassword(email);
      enqueueSnackbar(
        'Email de réinitialisation du mot de passe envoyé avec succès',
        { variant: 'success' }
      );
      navigate('/login');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        "Erreur lors de l'envoi de l'email de réinitialisation du mot de passe",
        { variant: 'error' }
      );
    }
    console.log('send email reset password');
  };
  return (
    <Stack alignItems="center" gap="50px" maxWidth="50%">
      <Stack alignItems="center" gap="5px">
        <Typography variant="h2" color="neutralDark.100">
          Mot de passe oublié ?
        </Typography>
        <Typography
          variant="subtitle1"
          color="neutralDark.400"
          textAlign="center"
        >
          Un email va vous être envoyé pour réinitialiser votre mot de passe
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
      </Stack>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSendEmailResetPassword}
      >
        Envoyer
      </Button>
    </Stack>
  );
};

export default SendEmailResetPassword;
