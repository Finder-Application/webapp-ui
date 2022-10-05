interface RouteFinder {
  path: string;
  page: React.LazyExoticComponent<() => JSX.Element>;
  layout?:
    | ((props: DefaultLayoutProps) => JSX.Element)
    | null
    | React.FC<DefaultLayoutProps>;
  title: string;
}
