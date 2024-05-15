import { createContext, useContext, useEffect, useState } from 'react';
import { ShopCtx } from './types';
import { Shop } from '@bikeshop-organizer/types';
import { useAuth } from '../AuthContext/AuthContext';

const ShopContext = createContext<ShopCtx>({
  shop: null,
  setShop: () => {},
});

const ShopProvider = ({ children }: { children: JSX.Element }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.shop) {
      setShop(user.shop);
    }
  }, [user]);
  return (
    <ShopContext.Provider value={{ shop: shop, setShop: setShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;

export const useShop = () => {
  return useContext(ShopContext);
};
