export function isVehicleInDispatchPool(vehicle) {
  return vehicle.status !== 'Retired' && vehicle.status !== 'In Shop';
}

export function isVehicleEligible(vehicle, cargoWeight) {
  if (!isVehicleInDispatchPool(vehicle)) {
    return { ok: false, reason: 'Vehicle not eligible (Retired/In Shop)' };
  }
  if (vehicle.status !== 'Available') {
    return { ok: false, reason: 'Vehicle not available' };
  }
  if (cargoWeight > vehicle.max_load_capacity) {
    return { ok: false, reason: `Capacity exceeded by ${cargoWeight - vehicle.max_load_capacity} kg` };
  }
  return { ok: true };
}