export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";

export interface Vehicle {
  id: string;
  plateNumber: string;
  status: VehicleStatus;
  model: string;
  year: number;
}

export interface Trip {
  id: string;
  vehicleId: string;
  routeName: string;
  status: "Pending" | "Active" | "Completed" | "Cancelled";
  origin: string;
  destination: string;
  startTime: string;
  endTime?: string;
}

export interface DashboardKpis {
  activeVehicles: number;
  availableVehicles: number;
  vehiclesInMaintenance: number;
  activeTrips: number;
  pendingTrips: number;
  fleetUtilization: number;
}

export function getMockKPIs(): DashboardKpis {
  return {
    activeVehicles: 42,
    availableVehicles: 18,
    vehiclesInMaintenance: 5,
    activeTrips: 27,
    pendingTrips: 9,
    fleetUtilization: 70,
  };
}