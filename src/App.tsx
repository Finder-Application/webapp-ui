import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './components';
import { DefaultLayout } from './layouts';
import {
  PrivateOutletRoute,
  privateRoutes,
  PublicOutletRoute,
  publicRoutes,
} from './routes';

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
      <BrowserRouter>
        <Routes>
          <Route element={<PublicOutletRoute />}>
            {renderRoutes([...publicRoutes])}
          </Route>
          <Route element={<PrivateOutletRoute />}>
            {renderRoutes([...privateRoutes])}
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
