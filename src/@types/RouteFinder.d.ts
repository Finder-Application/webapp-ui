interface RouteFinder {
  path: string;
  page: (props: any) => JSX.Element;
  layout?: ((props: DefaultLayoutProps) => JSX.Element) | null;
  title: string;
}
