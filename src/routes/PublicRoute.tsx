import { useAuth } from '@/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routesPath } from './routes';

export const PublicOutletRoute = () => {
  const [auth] = useAuth();
  return auth ? <Navigate to={routesPath.home} /> : <Outlet />;
};
