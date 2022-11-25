import { ROUTES } from '@/configs';

export class RouteUtils {
  static getPath(key: keyof typeof ROUTES) {
    const pathname = ROUTES[key];
    const path = pathname.split('/')[1];
    return `/${path}`;
  }
}
