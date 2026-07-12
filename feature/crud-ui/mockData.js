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
