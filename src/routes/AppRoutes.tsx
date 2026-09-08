import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATHS } from './paths';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardPage } from '@/features/pages/DashboardPage';
import { LoginPages } from '@/features/pages/LoginPages';
import type { RootState } from '@/store';
import { StationsPage } from '@/features/pages/StationsPage';
import { StationDetail } from '@/features/pages/StationDetail';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
};

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATHS.DASHBOARD} replace />;
};

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: PATHS.HOME,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={PATHS.DASHBOARD} replace />,
          },
          {
            path: PATHS.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: PATHS.STATIONS,
            element: <StationsPage />,
          },
          {
            path: PATHS.STATION_DETAIL,
            element: <StationDetail />,
          }
        ],
      },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <LoginPages />,
      },
    ],
  },
]);