import asyncComponentLoader from '../utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('../pages/Login')),
    path: '/login',
    title: 'Connexion',
    hide: true,
    restricted: false,
  },
  [Pages.Signup]: {
    component: asyncComponentLoader(() => import('../pages/Signup')),
    path: '/signup',
    title: 'Inscription',
    hide: true,
    restricted: false,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('../pages/NotFound')),
    path: '*',
    restricted: false,
  },
};

export default routes;
