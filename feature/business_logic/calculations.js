export function totalOperationalCost(fuelLogs, maintenanceLogs) {
  const fuelTotal = fuelLogs.reduce((sum, f) => sum + f.cost, 0);
  const maintTotal = maintenanceLogs.reduce((sum, m) => sum + m.cost, 0);
  return fuelTotal + maintTotal;
}

export function fuelEfficiency(distance, fuelLiters) {
  return fuelLiters > 0 ? +(distance / fuelLiters).toFixed(1) : 0;
}

export function vehicleROI(revenue, maintenanceCost, fuelCost, acquisitionCost) {
  if (!acquisitionCost) return 0;
  return +(((revenue - (maintenanceCost + fuelCost)) / acquisitionCost) * 100).toFixed(1);
}