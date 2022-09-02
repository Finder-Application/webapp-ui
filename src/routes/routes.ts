import { routes } from '@/configs';
import { Homepage } from '@/pages/Home';
import { RouteFinder } from './types';

const publicRoutes: RouteFinder[] = [{ path: routes.home, page: Homepage }];

const privateRoutes: RouteFinder[] = [];

export { publicRoutes, privateRoutes };
