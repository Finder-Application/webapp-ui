interface RouteFinder {
  path: string;
  page: React.LazyExoticComponent<() => JSX.Element>;
  layout?: ((props: DefaultLayoutProps) => JSX.Element) | null;
  title: string;
}
