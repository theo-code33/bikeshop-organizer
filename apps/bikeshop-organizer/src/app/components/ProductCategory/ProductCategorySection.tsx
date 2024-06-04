import { Button, Stack, Typography } from '@mui/material';
import { useShop } from '../../context/ShopContext/ShopContext';
import TableCustom from '../TableCustom';

const ProductCategorySection = ({
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
          Mes catégories de produits
        </Typography>
        <Button variant="contained" onClick={handleOpenCreateDialog}>
          Ajouter une catégorie
        </Button>
      </Stack>
      {!shop.categories || shop.categories.length === 0 ? (
        <Typography variant="subtitle2">
          Aucune catégorie n'a été ajoutée pour le moment
        </Typography>
      ) : (
        <TableCustom
          datas={
            (shop.categories as {
              name: string;
              id: string;
            }[]) || []
          }
          columns={[
            {
              key: 'name',
              label: 'Nom de la catégorie',
            },
          ]}
          onRowClick={onRowClick}
        />
      )}
    </Stack>
  );
};

export default ProductCategorySection;
