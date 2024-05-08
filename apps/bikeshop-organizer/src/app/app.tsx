// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter } from 'react-router-dom';
import Pages from './routes/Pages/Pages';
import './app.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { IconX } from '@tabler/icons-react';

const CloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      onClick={() => {
        closeSnackbar(snackbarKey);
      }}
      sx={{
        position: 'fixed',
        top: '-3px',
        right: '-3px',
        color: 'white',
      }}
    >
      <IconX width="15px" height="15px" />
    </IconButton>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={4}
          action={(snackbarKey) => <CloseButton snackbarKey={snackbarKey} />}
        >
          <Pages />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
