export type TripStatus = "Draft" | "Dispatched" | "Completed" | "Cancelled";

export interface Trip {
  id: string;
  source: string; 
  destination: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number;
  plannedDistance: number;
  status: TripStatus;
}

export const getMockTrips = (): Trip[] => {
  return [
    {
      id: "trip-001",
      source: "Central Depot",
      destination: "Northside Retail Center",
      vehicleId: "veh-002",
      driverId: "drv-014",
      cargoWeight: 1240,
      plannedDistance: 86,
      status: "Dispatched",
    },
    {
      id: "trip-002",
      source: "East Hub",
      destination: "Metro Airport Cargo Terminal",
      vehicleId: "veh-001",
      driverId: "drv-008",
      cargoWeight: 780,
      plannedDistance: 41,
      status: "Completed",
    },
    {
      id: "trip-003",
      source: "Central Depot",
      destination: "Downtown Service District",
      vehicleId: "veh-005",
      driverId: "drv-021",
      cargoWeight: 560,
      plannedDistance: 29,
      status: "Draft",
    },
    {
      id: "trip-004",
      source: "South Freight Yard",
      destination: "Riverside Warehouse Park",
      vehicleId: "veh-003",
      driverId: "drv-006",
      cargoWeight: 1520,
      plannedDistance: 74,
      status: "Cancelled",
    },
    {
      id: "trip-005",
      source: "West Logistics Center",
      destination: "Lakeside Market Network",
      vehicleId: "veh-002",
      driverId: "drv-017",
      cargoWeight: 980,
      plannedDistance: 112,
      status: "Dispatched",
    },
  ];
};