// Must have the { } brackets!
import { ReportsPage } from "../../feature/dashboard_services/reports-page";
import VehiclesPage from "../../feature/crud-ui/vehicles-page";
import DriversPage from "../../feature/crud-ui/drivers-page";
import FuelPage from "../../feature/crud-ui/fuel-page";
import MaintenancePage from "../../feature/crud-ui/maintenance-page";
export default function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <MaintenancePage />
    </div>
  );
}