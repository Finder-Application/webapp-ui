import { ROUTES } from '@/configs';
import { useGetMe } from '@/hooks/auth/query';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const [auth] = useGetMe();

  return auth ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
