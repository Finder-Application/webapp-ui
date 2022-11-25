interface RouteFinder {
  path: string;
  page: React.LazyExoticComponent<(props: any) => JSX.Element | null>;
  layout?:
    | ((props: DefaultLayoutProps) => JSX.Element)
    | null
    | React.FC<DefaultLayoutProps>;
  title: string;
  params?: string;
  query?: Object;
}
