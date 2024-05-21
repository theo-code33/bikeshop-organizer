import { Button, Stack, Typography } from '@mui/material';
import { useShop } from '../../context/ShopContext/ShopContext';
import TableCustom from '../TableCustom';
import { Brand, ProductCategory } from '@bikeshop-organizer/types';

const ProductSection = ({
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
          Mes produits
        </Typography>
        <Button variant="contained" onClick={handleOpenCreateDialog}>
          Ajouter un produit
        </Button>
      </Stack>
      {!shop.products || shop.products.length === 0 ? (
        <Typography variant="subtitle2">
          Aucun produit n'a été ajouté pour le moment
        </Typography>
      ) : (
        <TableCustom
          datas={
            (shop.products as {
              name: string;
              id: string;
            }[]) || []
          }
          columns={[
            {
              key: 'name',
              label: 'Nom du produit',
            },
            {
              key: 'brand',
              label: 'Marque',
              render: (data: unknown) => (
                <Typography variant="body2">
                  {(
                    data as {
                      brand: Brand;
                    }
                  ).brand?.name || ''}
                </Typography>
              ),
            },
            {
              key: 'category',
              label: 'Catégorie',
              render: (data: unknown) => (
                <Typography variant="body2">
                  {
                    (
                      data as {
                        category: ProductCategory;
                      }
                    ).category.name
                  }
                </Typography>
              ),
            },
            {
              key: 'price',
              label: 'Prix',
              render: (data) => (
                <Typography variant="body2">
                  {parseFloat(data.price as string).toFixed(2)} €
                </Typography>
              ),
            },
          ]}
          onRowClick={onRowClick}
        />
      )}
    </Stack>
  );
};

export default ProductSection;
