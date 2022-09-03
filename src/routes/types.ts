import { DefaultLayoutProps } from '../layouts/types';
export interface RouteFinder {
  path: string;
  page: (props: any) => JSX.Element;
  layout?: (props: DefaultLayoutProps) => JSX.Element;
}
