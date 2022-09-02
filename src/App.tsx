import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { publicRoutes } from './routes';

function App() {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default App;
