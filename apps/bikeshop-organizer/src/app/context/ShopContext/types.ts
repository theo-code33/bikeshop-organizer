import { Shop } from '@bikeshop-organizer/types';

export type ShopCtx = {
  shop: Shop | null;
  setShop: React.Dispatch<React.SetStateAction<Shop | null>>;
};
