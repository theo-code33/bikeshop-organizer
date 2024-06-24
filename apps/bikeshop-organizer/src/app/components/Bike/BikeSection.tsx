import { Bike } from '@bikeshop-organizer/types';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { CreateBikeDto } from '../../utils/api/bike/types';
import { IconPencil } from '@tabler/icons-react';

const BikeSection = ({
  bikes,
  handleOpenBikeFormDialog,
  setCurrentBike,
}: {
  bikes: Bike[] | CreateBikeDto[];
  handleOpenBikeFormDialog: () => void;
  setCurrentBike: React.Dispatch<
    React.SetStateAction<Bike | CreateBikeDto | undefined>
  >;
}) => {
  return (
    <Stack gap="10px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="primary.dark">
          Vélos
        </Typography>
        <Button variant="outlined" onClick={handleOpenBikeFormDialog}>
          Ajouter un vélo
        </Button>
      </Stack>
      <Stack gap="5px">
        {bikes.map((bike, index) => (
          <Stack
            key={'id' in bike ? bike.id : `${bike.model}-${bike.color}`}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" gap="20px" alignItems="center">
              <Stack direction="row" alignItems="center">
                <Typography
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {bike.brand.name}
                </Typography>
                <Typography> - {bike.model}</Typography>
              </Stack>
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50px',
                  backgroundColor: bike.color,
                }}
              />
            </Stack>
            <IconButton
              onClick={() => {
                setCurrentBike(bike);
                handleOpenBikeFormDialog();
              }}
            >
              <IconPencil size={20} />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default BikeSection;
