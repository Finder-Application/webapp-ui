export interface RouteFinder {
  path: string;
  page: (props: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
}
