import {
  Box,
  Button,
  Drawer,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import Title from '../Title/Title';
import { Controller, useForm } from 'react-hook-form';
import { MuiColorInput } from 'mui-color-input';
import { useSnackbar } from 'notistack';
import { useShop } from '../../context/ShopContext/ShopContext';
import createStatus from '../../utils/api/status/create-status';

const CreateStatusDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { control, handleSubmit, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { shop, setShop } = useShop();
  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    const { name, description, color } = data as {
      name: string;
      description: string;
      color: string;
    };
    if (!color) {
      return enqueueSnackbar('Veuillez choisir une couleur', {
        variant: 'error',
      });
    }
    const statusDto = {
      name,
      description,
      color,
      shop: { id: shop.id },
    };

    try {
      const newStatus = await createStatus(statusDto);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          status: [...(prevShop.status || []), newStatus],
        };
      });
      enqueueSnackbar('Statut créé', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar('Erreur lors de la création du statut', {
        variant: 'error',
      });
    }
  };

  const handleClose = () => {
    setValue('name', '');
    setValue('description', '');
    setValue('color', '');
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Stack padding="50px" minWidth="60vw" gap="50px">
        <Title title="Créer un statut" titleVariant="h4" />
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Stack gap="50px" alignItems="flex-end">
            <Stack gap="32px" width="100%">
              <Controller
                name="name"
                control={control}
                defaultValue={''}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <Box width="100%">
                      <InputLabel htmlFor="name" required>
                        Nom
                      </InputLabel>
                      <TextField
                        type="text"
                        id="name"
                        name="name"
                        fullWidth
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        required
                      />
                    </Box>
                  );
                }}
                rules={{
                  required: 'Champs requis',
                }}
              />
              <Controller
                name="description"
                control={control}
                defaultValue={''}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <Box width="100%">
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <TextField
                        type="text"
                        id="description"
                        name="description"
                        fullWidth
                        onChange={onChange}
                        value={value}
                        error={!!error}
                      />
                    </Box>
                  );
                }}
              />
              <Controller
                name="color"
                control={control}
                defaultValue={''}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <Box width="100%">
                      <InputLabel htmlFor="color">Couleur</InputLabel>
                      <MuiColorInput
                        format="hex"
                        value={value}
                        onChange={onChange}
                      />
                    </Box>
                  );
                }}
                rules={{
                  required: 'Champs requis',
                }}
              />
            </Stack>
            <Box>
              <Button type="submit" variant="contained">
                Créer le statut
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  );
};

export default CreateStatusDialog;
