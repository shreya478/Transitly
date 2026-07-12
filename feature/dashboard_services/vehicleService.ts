export type VehicleStatus = "Available" | "On Trip" | "In Shop" | "Retired";

export interface Vehicle {
  id: string; // Kept this because React needs unique keys for mapping lists
  registrationNumber: string;
  nameModel: string;
  type: string;
  maxLoadCapacity: number;
  odometer: number;
  acquisitionCost: number;
  status: VehicleStatus;
}

export const getMockVehicles = (): Vehicle[] => {
  return [
    {
      id: "veh-001",
      registrationNumber: "TRN-4821",
      nameModel: "Ford Transit 350",
      type: "Cargo Van",
      maxLoadCapacity: 1450,
      odometer: 12500,
      acquisitionCost: 48500,
      status: "Available",
    },
    {
      id: "veh-002",
      registrationNumber: "TRN-9154",
      nameModel: "Mercedes Sprinter 314",
      type: "Box Truck",
      maxLoadCapacity: 1800,
      odometer: 34200,
      acquisitionCost: 61200,
      status: "On Trip",
    },
    {
      id: "veh-003",
      registrationNumber: "TRN-2307",
      nameModel: "Isuzu NPR-HD",
      type: "Delivery Truck",
      maxLoadCapacity: 3200,
      odometer: 89000,
      acquisitionCost: 74500,
      status: "In Shop",
    },
    {
      id: "veh-004",
      registrationNumber: "TRN-7740",
      nameModel: "Volvo FH16",
      type: "Heavy Hauler",
      maxLoadCapacity: 12000,
      odometer: 450000,
      acquisitionCost: 138000,
      status: "Retired",
    },
    {
      id: "veh-005",
      registrationNumber: "TRN-6608",
      nameModel: "Hino 195 Crew Cab",
      type: "Service Truck",
      maxLoadCapacity: 2100,
      odometer: 5200,
      acquisitionCost: 69300,
      status: "Available",
    },
  ];
};