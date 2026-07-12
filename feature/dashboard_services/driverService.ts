export type DriverStatus = "Available" | "On Trip" | "Off Duty";

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  status: DriverStatus;
}

export const getMockDrivers = (): Driver[] => {
  return [
    {
      id: "drv-006",
      name: "Marcus Johnson",
      licenseNumber: "CDL-893211",
      phoneNumber: "555-0102",
      status: "Available",
    },
    {
      id: "drv-008",
      name: "Sarah Chen",
      licenseNumber: "CDL-449021",
      phoneNumber: "555-0193",
      status: "On Trip",
    },
    {
      id: "drv-014",
      name: "David Rodriguez",
      licenseNumber: "CDL-221943",
      phoneNumber: "555-0144",
      status: "On Trip",
    },
    {
      id: "drv-017",
      name: "Michael Chang",
      licenseNumber: "CDL-998234",
      phoneNumber: "555-0177",
      status: "On Trip",
    },
    {
      id: "drv-021",
      name: "Jessica Taylor",
      licenseNumber: "CDL-554219",
      phoneNumber: "555-0188",
      status: "Available",
    }
  ];
};