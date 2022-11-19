import { ROUTES } from '@/configs';
import { useUserStore } from '@/store/user';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutletRoute = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = user.userId !== -1;
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
