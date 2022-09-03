import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'antd/dist/antd.css';
import { privateRoutes, publicRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './components';

function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.page;
            const Layout = route.layout || Fragment;
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
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.page;
            const Layout = route.layout || Fragment;
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
          })}{' '}
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
