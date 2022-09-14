import { Homepage, LoginPage } from '@/pages';

// * Define all routes fro websites
export const ROUTES = {
  home: '/home',
  login: '/',
};
const publicRoutes: RouteFinder[] = [
  {
    path: ROUTES.login,
    page: LoginPage,
  },
  { path: ROUTES.home, page: Homepage },
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
