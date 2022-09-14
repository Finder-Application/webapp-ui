import { DefaultLayout } from '@/layouts';
import { Homepage, LoginPage } from '@/pages';

// * Define all routes fro websites
const routesPath = {
  home: '/home',
  login: '/',
};

const publicRoutes: RouteFinder[] = [
  {
    path: routesPath.login,
    page: LoginPage,
  },
];

const privateRoutes: RouteFinder[] = [
  { path: routesPath.home, page: Homepage, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes, routesPath };
