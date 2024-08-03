import { Product } from '@bikeshop-organizer/types';
import { useEffect, useState } from 'react';
import { useShop } from '../../context/ShopContext/ShopContext';
import getShopProducts from '../api/product/get-shop-products';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { shop } = useShop();

  useEffect(() => {
    if (!shop) return;
    const fetchProducts = async () => {
      const products = await getShopProducts(shop.id);
      setProducts(products);
    };

    fetchProducts();
  }, [shop]);

  return { products };
};

export default useProducts;
