import { Box, Button, Stack, Typography } from '@mui/material';
import { Shop, Status } from '@bikeshop-organizer/types';
import StatusFormDialog from '../Status/StatusFormDialog';
import { useState } from 'react';
import TableCustom from '../TableCustom';

const StatusSection = ({ shop }: { shop: Shop }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<Status | undefined>();
  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setCurrentStatus(undefined);
  };
  const handleCloseDialog = () => {
    setCurrentStatus(undefined);
    setOpenDialog(false);
  };

  const handleOpenUpdateDialog = (status: unknown) => {
    setCurrentStatus(status as Status);
    setOpenDialog(true);
  };

  return (
    <>
      <Stack gap="32px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" color="primary.xdark">
            Mes Statut
          </Typography>
          <Button variant="contained" onClick={handleOpenCreateDialog}>
            Créer un statut
          </Button>
        </Stack>
        {shop.status?.length === 0 ? (
          <Typography variant="body1" color="primary.xdark">
            Aucun Statut n'a été créée pour le moment.
          </Typography>
        ) : (
          <TableCustom
            datas={
              (shop.status as {
                id: string;
                name: string;
                description: string;
                color: string;
              }[]) || []
            }
            onRowClick={handleOpenUpdateDialog}
            columns={[
              { key: 'name', label: 'Nom' },
              {
                key: 'description',
                label: 'Description',
                typographyVariant: 'body2',
              },
              {
                key: 'color',
                label: 'Couleur',
                render: (data) => {
                  return (
                    <Box
                      sx={{
                        width: '50px',
                        height: '15px',
                        backgroundColor: data.color as string,
                        borderRadius: '50px',
                        display: 'inline-block',
                      }}
                    ></Box>
                  );
                },
              },
            ]}
          />
        )}
      </Stack>
      <StatusFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        currentStatus={currentStatus}
      />
    </>
  );
};

export default StatusSection;
