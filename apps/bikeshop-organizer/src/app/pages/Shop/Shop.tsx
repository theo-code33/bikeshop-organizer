import { Stack } from '@mui/material';
import MainLayout from '../../layout/Main/Main.layout';
import Title from '../../components/Title/Title';
import BrandSection from '../../components/Brand/BrandSection';
import { useState } from 'react';
import { Brand, Product, ProductCategory } from '@bikeshop-organizer/types';
import BrandFormDialog from '../../components/Brand/BrandFormDialog';
import ProductCategorySection from '../../components/ProductCategory/ProductCategorySection';
import ProductCategoryFormDialog from '../../components/ProductCategory/ProductCategoryFormDialog';
import ProductSection from '../../components/Product/ProductSection';
import ProductFormDialog from '../../components/Product/ProductFormDialog';

const Shop = () => {
  const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();

  const [openProductCategoryDialog, setOpenProductCategoryDialog] =
    useState<boolean>(false);
  const [currentProductCategory, setCurrentProductCategory] = useState<
    ProductCategory | undefined
  >();

  const [openBrandDialog, setOpenBrandDialog] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | undefined>();

  const handleOpenCreateProductDialog = () => {
    setOpenProductDialog(true);
    setCurrentProduct(undefined);
  };
  const handleOpenUpdateProductDialog = (product: unknown) => {
    setOpenProductDialog(true);
    setCurrentProduct(product as Product);
  };
  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setCurrentProduct(undefined);
  };

  const handleOpenCreateProductCategoryDialog = () => {
    setOpenProductCategoryDialog(true);
    setCurrentProductCategory(undefined);
  };
  const handleOpenUpdateProductCategoryDialog = (productCategory: unknown) => {
    setOpenProductCategoryDialog(true);
    setCurrentProductCategory(productCategory as ProductCategory);
  };
  const handleCloseProductCategoryDialog = () => {
    setOpenProductCategoryDialog(false);
    setCurrentProductCategory(undefined);
  };

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
          <ProductSection
            handleOpenCreateDialog={handleOpenCreateProductDialog}
            onRowClick={handleOpenUpdateProductDialog}
          />
          <ProductCategorySection
            handleOpenCreateDialog={handleOpenCreateProductCategoryDialog}
            onRowClick={handleOpenUpdateProductCategoryDialog}
          />
          <BrandSection
            handleOpenCreateDialog={handleOpenCreateBrandDialog}
            onRowClick={handleOpenUpdateBrandDialog}
          />
        </Stack>
        <ProductFormDialog
          open={openProductDialog}
          onClose={handleCloseProductDialog}
          currentProduct={currentProduct}
        />
        <ProductCategoryFormDialog
          open={openProductCategoryDialog}
          onClose={handleCloseProductCategoryDialog}
          currentProductCategory={currentProductCategory}
        />
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
