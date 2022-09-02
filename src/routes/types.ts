export interface RouteFinder {
  path: string;
  page: () => JSX.Element;
  layout?: () => JSX.Element;
}
