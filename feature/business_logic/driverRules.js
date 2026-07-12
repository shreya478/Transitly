export function computeSafetyStatus(driver) {
  return new Date(driver.license_expiry) < new Date() ? 'Suspended' : 'Available';
}

export function isDriverEligibleForTrip(driver) {
  const safety = computeSafetyStatus(driver);
  if (safety === 'Suspended') return { ok: false, reason: 'License expired' };
  if (driver.status === 'Suspended') return { ok: false, reason: 'Driver suspended' };
  if (driver.status !== 'Available') return { ok: false, reason: 'Driver not available' };
  return { ok: true };
}