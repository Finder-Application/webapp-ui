import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginPage, SearchPage } from '@/pages';
import Homepage from '@/pages/Homepage/Homepage';

// * Define all routes for websites
export const ROUTES = {
  login: '/login',
  home: '/',
  about: '/about',
  guide: '/guide',
  search: '/search'
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
  { path: ROUTES.search, page: SearchPage, title: 'Search' },
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
