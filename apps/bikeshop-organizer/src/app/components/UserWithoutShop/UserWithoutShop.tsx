import { Button, Stack, Typography } from '@mui/material';
import Title from '../Title/Title';
import sendCreateShopEmail from '../../utils/api/mail/send-create-shop-email';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useSnackbar } from 'notistack';

const UserWithoutShop = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleSendCreateShopEmail = async () => {
    if (!user) return;

    try {
      await sendCreateShopEmail(user);
      enqueueSnackbar(
        'Votre demande a bien été envoyée, vous recevrez un email de confirmation dans les plus brefs délais.',
        {
          variant: 'success',
        }
      );
    } catch (error) {
      enqueueSnackbar(
        'Une erreur est survenue lors de l’envoi de votre demande, veuillez réessayer plus tard.',
        {
          variant: 'error',
        }
      );
    }
  };
  return (
    <Stack gap="32px" alignItems="flex-start">
      <Title title="Vous n’avez pas encore de boutique" />
      <Typography variant="subtitle1" maxWidth="70vw">
        Pas de panique ! Vous n’avez pas encore de boutique mais il vous suffit
        simplement d’envoyer une demande d’ouverture de boutique via le bouton
        ci-dessous. Un email automatique sera envoyé à un administrateur qui
        traitera votre demande et qui vous fera un retour par email dans les
        plus brefs délais.
      </Typography>
      <Stack width="100%" direction="row" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendCreateShopEmail}
        >
          Envoyer une demande
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserWithoutShop;
