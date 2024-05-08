import asyncComponentLoader from '../utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('../pages/Login')),
    path: '/login',
    title: 'Connexion',
    hide: true,
  },
  [Pages.Signup]: {
    component: asyncComponentLoader(() => import('../pages/Signup')),
    path: '/signup',
    title: 'Inscription',
    hide: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('../pages/NotFound')),
    path: '*',
  },
};

export default routes;
