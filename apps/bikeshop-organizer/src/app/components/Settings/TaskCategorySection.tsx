import {
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
import { Shop } from '@bikeshop-organizer/types';

const TaskCategorySection = ({ shop }: { shop: Shop }) => {
  const handleOpenCreateDialog = () => {
    console.log('open create dialog');
  };
  const handleOpenUpdateDialog = () => {
    console.log('open update dialog');
  };
  return (
    <Stack gap="32px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color="primary.xdark">
          Mes Prestations
        </Typography>
        <Button variant="contained" onClick={handleOpenCreateDialog}>
          Créer une prestation
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
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shop.taskCategories?.map((taskCategory, index) => (
                <TableRow
                  key={taskCategory.id}
                  hover
                  onClick={handleOpenUpdateDialog}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    sx={{
                      borderBottom:
                        index === shop.taskCategories!.length - 1
                          ? 'none'
                          : '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    <Typography variant="subtitle2">
                      {taskCategory.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom:
                        index === shop.taskCategories!.length - 1
                          ? 'none'
                          : '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {taskCategory.taskCategoryStatus?.map((item, i) => {
                      return (
                        item.status.name +
                        (i < taskCategory.taskCategoryStatus!.length - 1
                          ? ' / '
                          : '')
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default TaskCategorySection;
