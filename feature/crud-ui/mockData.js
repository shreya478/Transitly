export const mockVehicles = [
  {
    registrationNumber: "TX-9988-A",
    name: "Ford Transit Cargo 250",
    type: "Cargo Van",
    maxLoadCapacity: 1450,
    odometer: 32000,
    acquisitionCost: 38500,
    status: "Available",
    region: "North"
  },
  {
    registrationNumber: "TX-4411-B",
    name: "Mercedes-Benz Sprinter 3500",
    type: "Sprinter",
    maxLoadCapacity: 2200,
    odometer: 15400,
    acquisitionCost: 52000,
    status: "On Trip",
    region: "East"
  },
  {
    registrationNumber: "TX-7722-C",
    name: "Isuzu NPR-HD",
    type: "Box Truck",
    maxLoadCapacity: 3500,
    odometer: 89000,
    acquisitionCost: 65000,
    status: "In Shop",
    region: "South"
  },
  {
    registrationNumber: "TX-5566-D",
    name: "Chevrolet Express 3500",
    type: "Cargo Van",
    maxLoadCapacity: 1600,
    odometer: 120500,
    acquisitionCost: 31000,
    status: "Retired",
    region: "West"
  },
  {
    registrationNumber: "TX-1122-E",
    name: "Ram ProMaster 2500",
    type: "Cargo Van",
    maxLoadCapacity: 1500,
    odometer: 43000,
    acquisitionCost: 36000,
    status: "Available",
    region: "North"
  },
  {
    registrationNumber: "TX-8833-F",
    name: "Hino 268 Box Truck",
    type: "Box Truck",
    maxLoadCapacity: 4500,
    odometer: 62000,
    acquisitionCost: 78000,
    status: "On Trip",
    region: "Midwest"
  }
];

export const mockDrivers = [
  {
    name: "John Doe",
    licenseNumber: "DL-998811",
    licenseCategory: "Class A CDL",
    licenseExpiry: "2027-10-15",
    contactNumber: "+1-555-0199",
    safetyScore: 95,
    status: "Available"
  },
  {
    name: "Sarah Smith",
    licenseNumber: "DL-445522",
    licenseCategory: "Class A CDL",
    licenseExpiry: "2026-07-25", // Expiring soon (relative to 2026-07-12)
    contactNumber: "+1-555-0144",
    safetyScore: 98,
    status: "On Trip"
  },
  {
    name: "Robert Johnson",
    licenseNumber: "DL-772211",
    licenseCategory: "Class B CDL",
    licenseExpiry: "2026-05-10", // Expired (relative to 2026-07-12)
    contactNumber: "+1-555-0177",
    safetyScore: 82,
    status: "Suspended"
  },
  {
    name: "Emily Davis",
    licenseNumber: "DL-883399",
    licenseCategory: "Class B CDL",
    licenseExpiry: "2028-03-22",
    contactNumber: "+1-555-0188",
    safetyScore: 91,
    status: "Off Duty"
  },
  {
    name: "Michael Brown",
    licenseNumber: "DL-221133",
    licenseCategory: "Class A CDL",
    licenseExpiry: "2026-08-05", // Expiring soon (relative to 2026-07-12)
    contactNumber: "+1-555-0122",
    safetyScore: 89,
    status: "Available"
  },
  {
    name: "David Wilson",
    licenseNumber: "DL-665544",
    licenseCategory: "Class C",
    licenseExpiry: "2029-01-30",
    contactNumber: "+1-555-0166",
    safetyScore: 96,
    status: "On Trip"
  }
];

export const mockFuelLogs = [
  {
    vehicleRegistrationNumber: "TX-9988-A",
    date: "2026-07-01",
    liters: 65,
    cost: 95.50
  },
  {
    vehicleRegistrationNumber: "TX-4411-B",
    date: "2026-07-03",
    liters: 80,
    cost: 120.00
  },
  {
    vehicleRegistrationNumber: "TX-7722-C",
    date: "2026-07-04",
    liters: 120,
    cost: 185.00
  },
  {
    vehicleRegistrationNumber: "TX-1122-E",
    date: "2026-07-08",
    liters: 55,
    cost: 82.25
  },
  {
    vehicleRegistrationNumber: "TX-8833-F",
    date: "2026-07-10",
    liters: 150,
    cost: 230.00
  },
  {
    vehicleRegistrationNumber: "TX-9988-A",
    date: "2026-07-11",
    liters: 70,
    cost: 104.50
  }
];

export const mockExpenses = [
  {
    vehicleRegistrationNumber: "TX-4411-B",
    type: "Toll",
    date: "2026-07-02",
    amount: 15.00,
    notes: "Expressway toll"
  },
  {
    vehicleRegistrationNumber: "TX-7722-C",
    type: "Maintenance",
    date: "2026-07-05",
    amount: 350.00,
    notes: "Brake pad replacement"
  },
  {
    vehicleRegistrationNumber: "TX-1122-E",
    type: "Parking",
    date: "2026-07-07",
    amount: 25.00,
    notes: "Overnight depot parking"
  },
  {
    vehicleRegistrationNumber: "TX-9988-A",
    type: "Toll",
    date: "2026-07-09",
    amount: 12.50,
    notes: "State highway toll"
  },
  {
    vehicleRegistrationNumber: "TX-8833-F",
    type: "Maintenance",
    date: "2026-07-10",
    amount: 450.00,
    notes: "Scheduled 60k service"
  },
  {
    vehicleRegistrationNumber: "TX-5566-D",
    type: "Parking",
    date: "2026-07-11",
    amount: 20.00,
    notes: "Client site parking fee"
  }
];

export const mockMaintenanceRecords = [
  {
    id: "m-1",
    vehicleRegistrationNumber: "TX-9988-A",
    issueDescription: "Oil change and filter replacement",
    priority: "Low",
    status: "Resolved",
    dateRaised: "2026-07-01"
  },
  {
    id: "m-2",
    vehicleRegistrationNumber: "TX-4411-B",
    issueDescription: "Clutch slipping on shifts",
    priority: "High",
    status: "In Progress",
    dateRaised: "2026-07-08"
  },
  {
    id: "m-3",
    vehicleRegistrationNumber: "TX-7722-C",
    issueDescription: "Engine check light blinking",
    priority: "High",
    status: "Pending",
    dateRaised: "2026-07-11"
  },
  {
    id: "m-4",
    vehicleRegistrationNumber: "TX-5566-D",
    issueDescription: "Rear taillight bulb burned out",
    priority: "Low",
    status: "Pending",
    dateRaised: "2026-07-12"
  },
  {
    id: "m-5",
    vehicleRegistrationNumber: "TX-1122-E",
    issueDescription: "Air conditioning system recharge",
    priority: "Medium",
    status: "Resolved",
    dateRaised: "2026-07-05"
  },
  {
    id: "m-6",
    vehicleRegistrationNumber: "TX-8833-F",
    issueDescription: "Tire rotation and alignment check",
    priority: "Medium",
    status: "In Progress",
    dateRaised: "2026-07-09"
  }
];

export const mockTrips = [
  {
    id: "t-1",
    source: "Chicago",
    destination: "Indianapolis",
    vehicleRegistrationNumber: "TX-9988-A",
    driverName: "John Doe",
    cargoWeight: 1200,
    distance: 180,
    status: "Draft",
    dateCreated: "2026-07-10"
  },
  {
    id: "t-2",
    source: "New York",
    destination: "Boston",
    vehicleRegistrationNumber: "TX-7722-C",
    driverName: "Sarah Smith",
    cargoWeight: 2500,
    distance: 215,
    status: "Draft",
    dateCreated: "2026-07-11"
  },
  {
    id: "t-3",
    source: "Houston",
    destination: "Dallas",
    vehicleRegistrationNumber: "TX-1122-E",
    driverName: "Michael Brown",
    cargoWeight: 900,
    distance: 240,
    status: "Dispatched",
    dateCreated: "2026-07-12"
  },
  {
    id: "t-4",
    source: "Miami",
    destination: "Orlando",
    vehicleRegistrationNumber: "TX-4411-B",
    driverName: "John Doe",
    cargoWeight: 1500,
    distance: 235,
    status: "Completed",
    dateCreated: "2026-07-08"
  },
  {
    id: "t-5",
    source: "Los Angeles",
    destination: "San Francisco",
    vehicleRegistrationNumber: "TX-8833-F",
    driverName: "Sarah Smith",
    cargoWeight: 3000,
    distance: 380,
    status: "Cancelled",
    dateCreated: "2026-07-09"
  }
];
