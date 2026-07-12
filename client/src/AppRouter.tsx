import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

// Dashboard services
import { DashboardPage } from '../../feature/dashboard_services/dashboard-page';
import { ReportsPage } from '../../feature/dashboard_services/reports-page';

// CRUD pages
import VehiclesPage from '../../feature/crud-ui/vehicles-page';
import TripsPage from '../../feature/crud-ui/trips-page';
import DriversPage from '../../feature/crud-ui/drivers-page';
import FuelPage from '../../feature/crud-ui/fuel-page';
import MaintenancePage from '../../feature/crud-ui/maintenance-page';

// App pages
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Dashboard
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },

      // Fleet
      { path: 'vehicles', element: <VehiclesPage /> },
      { path: 'trips', element: <TripsPage /> },
      { path: 'drivers', element: <DriversPage /> },

      // Operations
      { path: 'fuel', element: <FuelPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },

      // System
      { path: 'settings', element: <SettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
