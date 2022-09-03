import { DefaultLayout } from '@/layouts';
import { routes } from '@/configs';
import { Homepage } from '@/pages/Home';
import { RouteFinder } from './types';

const publicRoutes: RouteFinder[] = [
  { path: routes.home, page: Homepage, layout: DefaultLayout },
];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
