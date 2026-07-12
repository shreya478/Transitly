import { isVehicleEligible } from './vehicleRules.js';
import { isDriverEligibleForTrip } from './driverRules.js';

export function canDispatchTrip(trip, vehicle, driver) {
  const vehicleCheck = isVehicleEligible(vehicle, trip.cargo_weight);
  if (!vehicleCheck.ok) return vehicleCheck;

  const driverCheck = isDriverEligibleForTrip(driver);
  if (!driverCheck.ok) return driverCheck;

  return { ok: true };
}

export function canCompleteTrip(trip, finalOdometer, fuelConsumed) {
  if (trip.status !== 'Dispatched') {
    return { ok: false, reason: 'Only dispatched trips can be completed' };
  }
  if (finalOdometer == null || fuelConsumed == null) {
    return { ok: false, reason: 'Odometer and fuel must be logged before completing trip' };
  }
  return { ok: true };
}

export function canCancelTrip(trip) {
  if (trip.status !== 'Dispatched') {
    return { ok: false, reason: 'Only dispatched trips can be cancelled' };
  }
  return { ok: true };
}