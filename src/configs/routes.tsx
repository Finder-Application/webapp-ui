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
];

const privateRoutes: RouteFinder[] = [{ path: ROUTES.home, page: Homepage }];

export { publicRoutes, privateRoutes };
