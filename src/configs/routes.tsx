import { AuthLayout } from '@/layouts';
import { LoginPage, SearchPage } from '@/pages';
import CreatePostPage from '@/pages/CreatePostPage/CreatePostPage';
import React, { lazy } from 'react';

// * Define all routes for websites
export const ROUTES = {
  login: '/login',
  home: '/',
  about: '/about',
  guide: '/guide',
  search: '/search',
  createPost: '/create-post',
};

const publicRoutes: RouteFinder[] = [
  {
    path: ROUTES.login,
    title: 'Login',
    layout: AuthLayout,
    page: lazy(() => import('@/pages/LoginPage/LoginPage')),
  },
  {
    path: ROUTES.home,
    page: lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'Homepage',
  },
  {
    path: ROUTES.about,
    page: lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'About',
  },
  {
    path: ROUTES.guide,
    page: React.lazy(() => import('@/pages/Homepage/Homepage')),
    title: 'Guild Lines',
  },
  {
    path: ROUTES.createPost,
    page: React.lazy(() => import('@/pages/CreatePostPage/CreatePostPage')),
    title: 'Create Post',
  },
  {
    path: ROUTES.search,
    page: lazy(() => import('@/pages/ReSearchPage/ReSearchPage')),
    title: 'Search',
  },
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
