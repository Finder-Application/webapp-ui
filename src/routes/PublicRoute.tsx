import { ROUTES } from '@/configs';
import { useGetMe } from '@/hooks/auth/query';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicOutletRoute = () => {
  // const [auth] = useGetMe();
  return <Outlet />;
};
