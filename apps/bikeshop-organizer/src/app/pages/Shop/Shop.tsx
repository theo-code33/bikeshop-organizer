import { Stack } from '@mui/material';
import MainLayout from '../../layout/Main/Main.layout';
import Title from '../../components/Title/Title';
import BrandSection from '../../components/Brand/BrandSection';
import { useState } from 'react';
import { Brand } from '@bikeshop-organizer/types';
import BrandFormDialog from '../../components/Brand/BrandFormDialog';

const Shop = () => {
  const [openBrandDialog, setOpenBrandDialog] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | undefined>();

  const handleOpenCreateBrandDialog = () => {
    setOpenBrandDialog(true);
    setCurrentBrand(undefined);
  };
  const handleOpenUpdateBrandDialog = (brand: unknown) => {
    setOpenBrandDialog(true);
    setCurrentBrand(brand as Brand);
  };

  const handleCloseBrandDialog = () => {
    setOpenBrandDialog(false);
    setCurrentBrand(undefined);
  };
  return (
    <MainLayout>
      <>
        <Stack gap="50px">
          <Title title="Boutique" />
          <BrandSection
            handleOpenCreateDialog={handleOpenCreateBrandDialog}
            onRowClick={handleOpenUpdateBrandDialog}
          />
        </Stack>
        <BrandFormDialog
          open={openBrandDialog}
          onClose={handleCloseBrandDialog}
          currentBrand={currentBrand}
        />
      </>
    </MainLayout>
  );
};

export default Shop;
