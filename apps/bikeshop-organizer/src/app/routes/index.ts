import asyncComponentLoader from '../utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Main]: {
    component: asyncComponentLoader(() => import('../pages/Main')),
    path: '/',
    title: 'Accueil',
    restricted: true,
  },
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
  [Pages.ResetPassword]: {
    component: asyncComponentLoader(() => import('../pages/ResetPassword')),
    path: '/reset-password',
    title: 'Réinitialisation du mot de passe',
    hide: true,
    restricted: false,
  },
  [Pages.User]: {
    component: asyncComponentLoader(() => import('../pages/User')),
    path: '/user',
    title: 'Profil',
    restricted: true,
  },
  [Pages.Settings]: {
    component: asyncComponentLoader(() => import('../pages/Settings')),
    path: '/settings',
    title: 'Paramètres',
    restricted: true,
  },
  [Pages.Clients]: {
    component: asyncComponentLoader(() => import('../pages/Clients')),
    path: '/clients',
    title: 'Clients',
    restricted: true,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('../pages/NotFound')),
    path: '*',
    restricted: false,
  },
};

export default routes;
