import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './components';
import { privateRoutes, publicRoutes, ROUTES } from './configs';
import { DefaultLayout } from './layouts';
import { CustomPage } from './pages/CustomPage';
import { PrivateOutletRoute, PublicOutletRoute } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Test } from './Test';

function App() {
  const renderRoutes = (routes: RouteFinder[]): JSX.Element[] =>
    routes.map((route, index) => {
      const Layout =
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

export default App;
