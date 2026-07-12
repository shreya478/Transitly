export function onMaintenanceCreate(vehicle) {
  return { ...vehicle, status: 'In Shop' };
}

export function onMaintenanceClose(vehicle) {
  if (vehicle.status === 'Retired') return vehicle;
  return { ...vehicle, status: 'Available' };
}