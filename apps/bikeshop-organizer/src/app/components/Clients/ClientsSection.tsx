import { Shop } from '@bikeshop-organizer/types';
import TableCustom from '../TableCustom';
import { Typography } from '@mui/material';

const ClientsSection = ({
  shop,
  onRowClick,
}: {
  shop: Shop;
  onRowClick: (data: unknown) => void;
}) => {
  return (
    <TableCustom
      datas={
        (shop.clients as {
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
          postalCode: string;
          city: string;
          id: string;
        }[]) || []
      }
      columns={[
        {
          key: 'firstName',
          label: 'Nom / Prénom',
          render: (data) => (
            <Typography variant="subtitle2">
              {data.firstName} {data.lastName}
            </Typography>
          ),
        },
        { key: 'phoneNumber', label: 'Téléphone', typographyVariant: 'body2' },
        { key: 'email', label: 'Email', typographyVariant: 'body2' },
        {
          key: 'postalCode',
          label: 'CP - Ville',
          render: (data) => (
            <Typography variant="body2">
              {data.postalCode} - {data.city}
            </Typography>
          ),
        },
        {
          key: 'bikes',
          label: 'Nombre de vélos',
          render: (data) => (
            <Typography variant="body2">
              {(data.bikes as string[])?.length}{' '}
              {(data.bikes as string[]).length > 1 ? 'vélos' : 'vélo'}
            </Typography>
          ),
        },
      ]}
      onRowClick={onRowClick}
    />
  );
};

export default ClientsSection;
