import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Shop, Status } from '@bikeshop-organizer/types';
import StatusFormDialog from '../Status/StatusFormDialog';
import { useState } from 'react';

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

  const handleOpenUpdateDialog = (status: Status) => {
    setCurrentStatus(status);
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
        {shop.taskCategories?.length === 0 ? (
          <Typography variant="body1" color="primary.xdark">
            Aucune prestation n'a été créée pour le moment.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              width: 'auto',
              borderRadius: '15px',
              padding: '10px',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Couleur</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shop.status?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    hover
                    onClick={() => handleOpenUpdateDialog(item)}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell
                      sx={{
                        borderBottom:
                          index === shop.status!.length - 1
                            ? 'none'
                            : '1px solid rgba(224, 224, 224, 1)',
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom:
                          index === shop.status!.length - 1
                            ? 'none'
                            : '1px solid rgba(224, 224, 224, 1)',
                      }}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom:
                          index === shop.status!.length - 1
                            ? 'none'
                            : '1px solid rgba(224, 224, 224, 1)',
                      }}
                    >
                      <Box
                        sx={{
                          width: '50px',
                          height: '15px',
                          backgroundColor: item.color,
                          borderRadius: '50px',
                          display: 'inline-block',
                          // marginRight: '5px',
                        }}
                      ></Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
