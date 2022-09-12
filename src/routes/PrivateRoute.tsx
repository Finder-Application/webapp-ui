import { useAuth } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { routesPath } from './routes';

export const PrivateOutletRoute = () => {
  const [auth] = useAuth();
  return auth ? <Outlet /> : <Navigate to={routesPath.login} />;
};
