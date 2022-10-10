import { ROUTES } from '@/configs';
import { useAuth } from '@/hooks/query/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const [auth] = useAuth();
  return auth ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
