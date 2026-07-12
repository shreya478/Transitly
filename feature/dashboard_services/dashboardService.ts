import { getMockVehicles } from './vehicleService';
import { getMockTrips } from './tripService';
import { getMockDrivers } from './driverService';

export const getMockKPIs = () => {
  // Add defensive fallbacks in case Copilot's files return undefined
  const vehicles = getMockVehicles() || [];
  const trips = getMockTrips() || [];
  const drivers = getMockDrivers() || [];

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === 'On Trip').length;
  const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'In Shop').length;
  const retiredVehicles = vehicles.filter(v => v.status === 'Retired').length;

  const activeTrips = trips.filter(t => t.status === 'Dispatched').length;
  const pendingTrips = trips.filter(t => t.status === 'Draft').length;
  
  const driversOnDuty = drivers.filter(d => d.status === 'On Trip').length;

  const validFleetSize = totalVehicles - retiredVehicles;
  const fleetUtilizationPercent = validFleetSize > 0 
    ? (activeVehicles / validFleetSize) * 100 
    : 0;

  return {
    totalVehicles,
    activeVehicles,
    availableVehicles,
    maintenanceVehicles,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    fleetUtilizationPercent: Math.round(fleetUtilizationPercent)
  };
};