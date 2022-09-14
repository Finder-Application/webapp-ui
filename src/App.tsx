import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './components';
import { privateRoutes, publicRoutes } from './configs';
import { DefaultLayout } from './layouts';
import { PrivateOutletRoute, PublicOutletRoute } from './routes';

function App() {
  const renderRoutes = (routes: RouteFinder[]): JSX.Element[] =>
    routes.map((route, index) => {
      const Page = route.page;
      let Layout =
        route.layout === undefined
          ? DefaultLayout
          : route.layout === null
          ? Fragment
          : route.layout;

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  return (
    <GlobalStyles>
      <Routes>
        <Route element={<PublicOutletRoute />}>
          {renderRoutes([...publicRoutes])}
        </Route>
        <Route element={<PrivateOutletRoute />}>
          {renderRoutes([...privateRoutes])}
        </Route>
      </Routes>
    </GlobalStyles>
  );
}

export default App;
