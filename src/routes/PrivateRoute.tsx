import { ROUTES } from '@/configs';
import { useUserStore } from '@/store/user';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
