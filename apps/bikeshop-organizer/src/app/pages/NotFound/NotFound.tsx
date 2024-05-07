import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import {
  CenteredFlexBox,
  FullSizeCenteredFlexBox,
} from '../../components/styled';
import { messages } from '../../config';

function NotFound() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <Container sx={{ height: '100%' }} data-testid="container-not-found">
      <FullSizeCenteredFlexBox flexDirection="column">
        <CenteredFlexBox flexDirection="column">
          <Typography
            data-testid="not-found-title"
            sx={{ mt: 2 }}
            variant="h4"
            color="error"
          >
            404 Not Found
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h4" sx={{ color: 'info.main' }}>
            {messages[404]}
          </Typography>
          <Button onClick={handleNavigate} variant="outlined" sx={{ mt: 2 }}>
            Retour à l&apos;accueil
          </Button>
        </CenteredFlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default NotFound;
