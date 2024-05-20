import { Button, Stack } from '@mui/material';
import Title from '../../components/Title/Title';
import MainLayout from '../../layout/Main/Main.layout';
import { useShop } from '../../context/ShopContext/ShopContext';
import ClientsSection from '../../components/Clients/ClientsSection';
import { useState } from 'react';
import { Client } from '@bikeshop-organizer/types';
import ClientFormDialog from '../../components/Clients/ClientFormDialog';

const Clients = () => {
  const { shop } = useShop();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentClient, setCurrentClient] = useState<Client | undefined>();

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setCurrentClient(undefined);
  };

  const handleOpenUpdateDialog = (client: unknown) => {
    setOpenDialog(true);
    setCurrentClient(client as Client);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentClient(undefined);
  };

  return (
    <MainLayout>
      <>
        <Stack gap="50px">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Title title="Clients" />
            <Button variant="contained" onClick={handleOpenCreateDialog}>
              Ajouter un client
            </Button>
          </Stack>
          {shop && (
            <ClientsSection shop={shop} onRowClick={handleOpenUpdateDialog} />
          )}
        </Stack>
        <ClientFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          currentClient={currentClient}
        />
      </>
    </MainLayout>
  );
};

export default Clients;
