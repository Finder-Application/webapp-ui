import { AuthLayout } from '@/layouts';
import { LoginPage, SearchPage } from '@/pages';
import CreatePostPage from '@/pages/CreatePostPage/CreatePostPage';
import Homepage from '@/pages/Homepage/Homepage';
import { Route, Routes } from 'react-router-dom';

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
    page: LoginPage,
    title: 'Login',
    layout: AuthLayout,
  },
  { path: ROUTES.home, page: Homepage, title: 'Homepage' },
  { path: ROUTES.about, page: Homepage, title: 'About' },
  { path: ROUTES.guide, page: Homepage, title: 'Guild Lines' },
  { path: ROUTES.createPost, page: CreatePostPage, title: 'Create Post' },
  { path: ROUTES.search, page: SearchPage, title:'Search' }
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
