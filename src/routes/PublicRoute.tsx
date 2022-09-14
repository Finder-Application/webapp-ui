import { ROUTES } from '@/configs';
import { useAuth } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicOutletRoute = () => {
  const [auth] = useAuth();
  return auth ? <Navigate to={ROUTES.home} /> : <Outlet />;
};
