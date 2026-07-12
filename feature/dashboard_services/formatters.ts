export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const calculateVehicleROI = (
  revenue: number,
  maintenanceCost: number,
  fuelCost: number,
  acquisitionCost: number
): number => {
  if (!acquisitionCost || acquisitionCost === 0) return 0;
  
  const roi = (revenue - (maintenanceCost + fuelCost)) / acquisitionCost;
  return Number((roi * 100).toFixed(2)); // Returns percentage
};