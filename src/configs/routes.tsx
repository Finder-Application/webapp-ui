import { LoginPage } from '@/pages';
import Homepage from '@/pages/Homepage/Homepage';

// * Define all routes fro websites
export const ROUTES = {
  home: '/home',
  login: '/',
};
const publicRoutes: RouteFinder[] = [
  {
    path: ROUTES.login,
    page: LoginPage,
    title: 'Login',
  },
  { path: ROUTES.home, page: Homepage, title: 'Homepage' },
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
