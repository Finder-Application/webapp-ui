import { ROUTES } from '@/configs';
import { useGetMe } from '@/hooks/auth/query';
import { Spin } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return <Spin />;
  }

  return data ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
