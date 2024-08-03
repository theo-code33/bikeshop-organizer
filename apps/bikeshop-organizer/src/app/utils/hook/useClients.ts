import { useEffect, useState } from 'react';
import { useShop } from '../../context/ShopContext/ShopContext';
import { Client } from '@bikeshop-organizer/types';
import getShopClients from '../api/client/get-shop-clients';

const useClients = () => {
  const { shop } = useShop();
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    if (shop) {
      getShopClients(shop.id)
        .then((data) => {
          setClients(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [shop]);

  return { clients };
};

export default useClients;
