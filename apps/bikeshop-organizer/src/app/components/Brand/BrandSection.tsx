import { Button, Stack, Typography } from '@mui/material';
import TableCustom from '../TableCustom';
import { useShop } from '../../context/ShopContext/ShopContext';

const BrandSection = ({
  handleOpenCreateDialog,
  onRowClick,
}: {
  handleOpenCreateDialog: () => void;
  onRowClick: (data: unknown) => void;
}) => {
  const { shop } = useShop();
  if (!shop) return null;
  return (
    <Stack gap="15px">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" color="primary.dark">
          Mes marques
        </Typography>
        <Button variant="contained" onClick={handleOpenCreateDialog}>
          Ajouter une marque
        </Button>
      </Stack>
      {!shop.brands || shop.brands.length === 0 ? (
        <Typography variant="subtitle2">
          Aucune marque n'a été ajoutée pour le moment
        </Typography>
      ) : (
        <TableCustom
          datas={
            (shop.brands as {
              name: string;
              id: string;
            }[]) || []
          }
          columns={[
            {
              key: 'name',
              label: 'Nom de la marque',
            },
          ]}
          onRowClick={onRowClick}
        />
      )}
    </Stack>
  );
};

export default BrandSection;
