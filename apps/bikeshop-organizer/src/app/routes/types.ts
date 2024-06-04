import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';
import { Icon, IconProps } from '@tabler/icons-react';

enum Pages {
  Main,
  Login,
  Signup,
  ResetPassword,
  User,
  Settings,
  Clients,
  Shop,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?:
    | FC<SvgIconProps>
    | ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>;
  hide?: boolean;
  restricted?: boolean;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
