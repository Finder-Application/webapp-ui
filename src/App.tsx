import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalStyles from './components/GlobalStyles';
import { privateRoutes, publicRoutes, ROUTES } from './configs';
import { useGetMe } from './hooks/auth/query';
import { DefaultLayout } from './layouts';
import { CustomPage } from './pages/CustomPage';
import { PrivateOutletRoute, PublicOutletRoute } from './routes';

function App() {
  useGetMe();
  const renderRoutes = (routes: RouteFinder[]): JSX.Element[] =>
    routes.map((route, index) => {
      const Layout =
        route.layout === undefined
          ? DefaultLayout
          : route.layout === null
          ? Fragment
          : route.layout;
      let path = route.path;
      if (route.params) {
        path = `${route.path}/${route.params}`;
      }
      return (
        <Route
          key={index}
          path={path}
          element={
            <Layout>
              <CustomPage {...route} />
            </Layout>
          }
        />
      );
    });
  return (
    <GlobalStyles>
      <>
        <Routes>
          <Route element={<PublicOutletRoute />}>
            {renderRoutes([...publicRoutes])}
          </Route>
          <Route element={<PrivateOutletRoute />}>
            {renderRoutes([...privateRoutes])}
          </Route>
          <Route
            path='*'
            element={
              <DefaultLayout>
                <Navigate to={ROUTES.home} />
              </DefaultLayout>
            }
          />
        </Routes>
        <ToastContainer />
      </>
    </GlobalStyles>
  );
}

export { App };
