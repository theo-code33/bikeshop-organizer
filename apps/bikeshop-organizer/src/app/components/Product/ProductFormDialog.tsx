import { Controller, useForm } from 'react-hook-form';
import DrawerCustom from '../DrawerCustom/DrawerCustom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Title from '../Title/Title';
import { Brand, Product, ProductCategory } from '@bikeshop-organizer/types';
import { useEffect, useState } from 'react';
import getBrandsByShopId from '../../utils/api/brand/get-brands-by-shop-id';
import { useShop } from '../../context/ShopContext/ShopContext';
import getProductCategoriesByShopId from '../../utils/api/productCategory/get-product-categories-by-shop-id';
import { useSnackbar } from 'notistack';
import createProduct from '../../utils/api/product/create-product';
import { ProductDto } from '../../utils/api/product/types';
import deleteProduct from '../../utils/api/product/delete-product';
import updateProduct from '../../utils/api/product/update-product';

const ProductFormDialog = ({
  open,
  onClose,
  currentProduct,
}: {
  open: boolean;
  onClose: () => void;
  currentProduct?: Product;
}) => {
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );

  const { handleSubmit, control, setValue } = useForm();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { shop, setShop } = useShop();

  const onSubmit = async (data: unknown) => {
    if (!shop) return;
    const { name, price, category, brand } = data as {
      name: string;
      price: string;
      category: string;
      brand: string;
    };
    const productDto: ProductDto = {
      name,
      price: parseFloat(price),
      shop: { id: shop.id },
      category: { id: category },
    };
    if (typeof brand === 'string' && brand !== '') {
      productDto.brand = { id: brand };
    }

    if (currentProduct) {
      try {
        if (typeof brand === 'string' && brand === '') {
          productDto.brand = null;
        }
        const productUpdated = await updateProduct(
          currentProduct.id,
          productDto
        );
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            products: prevShop.products?.map((product) => {
              if (product.id === productUpdated.id) {
                return productUpdated;
              }
              return product;
            }),
          };
        });
        enqueueSnackbar('Produit modifié avec succès', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la modification du produit', {
          variant: 'error',
        });
      }
    } else {
      try {
        const productCreated = await createProduct(productDto);
        setShop((prevShop) => {
          if (!prevShop) return prevShop;
          return {
            ...prevShop,
            products: [...(prevShop.products || []), productCreated],
          };
        });
        enqueueSnackbar('Produit créé avec succès', {
          variant: 'success',
        });
        handleClose();
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erreur lors de la création du produit', {
          variant: 'error',
        });
      }
    }
  };

  const handleClose = () => {
    onClose();
    setValue('name', '');
    setValue('price', '');
    setValue('category', '');
    setValue('brand', '');
  };

  const handleOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true);
  };
  const handleCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    if (!currentProduct) return;
    try {
      const productId = await deleteProduct(currentProduct.id);
      setShop((prevShop) => {
        if (!prevShop) return prevShop;
        return {
          ...prevShop,
          products: prevShop.products?.filter(
            (product) => product.id !== productId
          ),
        };
      });
      enqueueSnackbar('Produit supprimé avec succès', {
        variant: 'success',
      });
      handleCloseConfirmDeleteModal();
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de la suppression du produit', {
        variant: 'error',
      });
    }
  };

  const fetchBrands = async () => {
    if (!shop) return;
    try {
      const fetchedBrands = await getBrandsByShopId(shop.id);
      const defaultBrand: Brand = {
        id: '',
        name: 'Aucune marque',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBrands([defaultBrand, ...fetchedBrands]);
    } catch (error) {
      console.error(error);
      setBrands([]);
    }
  };

  const fetchProductCategories = async () => {
    if (!shop) return;
    try {
      const fetchedProductCategories = await getProductCategoriesByShopId(
        shop.id
      );
      setProductCategories(fetchedProductCategories);
    } catch (error) {
      console.error(error);
      setProductCategories([]);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBrands();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop?.brands]);
  useEffect(() => {
    (async () => {
      await fetchProductCategories();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop?.categories]);

  useEffect(() => {
    if (currentProduct) {
      setValue('name', currentProduct.name);
      setValue('price', currentProduct.price.toString());
      if (currentProduct.category) {
        setValue('category', currentProduct.category.id);
      }
      if (currentProduct.brand) {
        setValue('brand', currentProduct.brand.id);
      }
    }
  }, [currentProduct, setValue]);
  return (
    <>
      <DrawerCustom open={open} handleClose={handleClose}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack gap="50px">
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Title
                title={
                  currentProduct ? 'Modifier le produit' : 'Créer un produit'
                }
                titleVariant="h4"
              />
              {currentProduct && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenConfirmDeleteModal}
                >
                  Supprimer le produit
                </Button>
              )}
            </Stack>
            <Stack direction="row" gap="10px">
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
                name="price"
                control={control}
                defaultValue={''}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <Box width="100%">
                      <InputLabel htmlFor="price" required>
                        Prix
                      </InputLabel>
                      <TextField
                        type="number"
                        id="price"
                        name="price"
                        fullWidth
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        required
                        InputProps={{
                          endAdornment: '€',
                        }}
                      />
                    </Box>
                  );
                }}
                rules={{
                  required: 'Champs requis',
                }}
              />
            </Stack>
            <Stack gap="10px">
              <Typography variant="h6" color="primary.dark">
                Catégorie
                <span
                  style={{
                    color: theme.palette.error.main,
                  }}
                >
                  *
                </span>
              </Typography>
              <Stack direction="row" gap="10px">
                <Controller
                  name="category"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="category"
                        name="category"
                        value={value}
                        onChange={onChange}
                        fullWidth
                      >
                        {productCategories.map((productCategory) => (
                          <MenuItem
                            key={productCategory.id}
                            value={productCategory.id}
                          >
                            {productCategory.name}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </Stack>
            </Stack>
            <Stack gap="10px">
              <Typography variant="h6" color="primary.dark">
                Marque
              </Typography>
              <Stack direction="row" gap="10px">
                <Controller
                  name="brand"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        id="brand"
                        name="brand"
                        value={value}
                        onChange={onChange}
                        fullWidth
                      >
                        {brands.map((brand) => (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Button variant="text" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" variant="contained">
              {currentProduct ? 'Modifier' : 'Créer le produit'}
            </Button>
          </Stack>
        </form>
      </DrawerCustom>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseConfirmDeleteModal}
      >
        <DialogTitle>
          Êtes-vous sûr de vouloir supprimer ce produit ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Cette action est irréversible. Vous ne pourrez pas récupérer ce
            produit.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseConfirmDeleteModal}>
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProduct}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductFormDialog;
