import { ROUTES } from '@/configs';
import { useGetMe } from '@/hooks/auth/query';
import { useUserStore } from '@/store/user';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const { data, isLoading } = useGetMe();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return <Spin />;
  }

  return data ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
