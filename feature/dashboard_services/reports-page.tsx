import React from 'react';
import { getMockKPIs } from './dashboardService';
import { getMockVehicles } from './vehicleService';
import { calculateVehicleROI, formatCurrency } from './formatters';
import { KpiCard } from './KpiCard';

export const ReportsPage = () => {
  const kpis = getMockKPIs();
  const vehicles = getMockVehicles();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Operations Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-time mock metrics and reports</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Active Vehicles (On Trip)" value={kpis.activeVehicles} />
        <KpiCard title="Available Vehicles" value={kpis.availableVehicles} />
        <KpiCard title="Vehicles In Shop" value={kpis.maintenanceVehicles} />
        <KpiCard title="Fleet Utilization" value={`${kpis.fleetUtilizationPercent}%`} />
        
        <KpiCard title="Active Trips" value={kpis.activeTrips} />
        <KpiCard title="Pending Trips" value={kpis.pendingTrips} />
        <KpiCard title="Drivers On Duty" value={kpis.driversOnDuty} />
        <KpiCard title="Avg Fuel Efficiency" value="8.4 km/L" /> {/* Static until Fuel module is built */}
      </div>

      {/* Vehicle ROI Report Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Vehicle ROI Report</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Registration</th>
                <th className="px-6 py-3">Model</th>
                <th className="px-6 py-3">Acquisition Cost</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Est. ROI</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                // Mocking revenue/costs just to show the calculation working
                const mockRevenue = vehicle.maxLoadCapacity * 10; 
                const mockFuelAndMaint = vehicle.odometer * 0.15;
                const roi = calculateVehicleROI(mockRevenue, mockFuelAndMaint, 0, vehicle.acquisitionCost);

                return (
                  <tr key={vehicle.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {vehicle.registrationNumber}
                    </td>
                    <td className="px-6 py-4">{vehicle.nameModel}</td>
                    <td className="px-6 py-4">{formatCurrency(vehicle.acquisitionCost)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {roi > 0 ? (
                        <span className="text-green-600 dark:text-green-400">+{roi}%</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">{roi}%</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};