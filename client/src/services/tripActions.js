import { supabase } from '../lib/supabase.js';
import { canDispatchTrip, canCompleteTrip, canCancelTrip } from '../rules/tripRules.js';

async function fetchTripBundle(tripId) {
  const { data: trip, error: tripErr } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();

  if (tripErr || !trip) {
    return { error: tripErr?.message ?? 'Trip not found' };
  }

  const { data: vehicle, error: vehicleErr } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', trip.vehicle_id)
    .single();

  if (vehicleErr || !vehicle) {
    return { error: vehicleErr?.message ?? 'Vehicle not found for this trip' };
  }

  const { data: driver, error: driverErr } = await supabase
    .from('drivers')
    .select('*')
    .eq('id', trip.driver_id)
    .single();

  if (driverErr || !driver) {
    return { error: driverErr?.message ?? 'Driver not found for this trip' };
  }

  return { trip, vehicle, driver };
}

export async function dispatchTrip(tripId) {
  const bundle = await fetchTripBundle(tripId);
  if (bundle.error) return { ok: false, reason: bundle.error };

  const { trip, vehicle, driver } = bundle;
  const check = canDispatchTrip(trip, vehicle, driver);
  if (!check.ok) return check;

  const { error: e1 } = await supabase
    .from('trips').update({ status: 'Dispatched' }).eq('id', tripId);
  if (e1) return { ok: false, reason: e1.message };

  const { error: e2 } = await supabase
    .from('vehicles').update({ status: 'On Trip' }).eq('id', vehicle.id);
  if (e2) return { ok: false, reason: e2.message };

  const { error: e3 } = await supabase
    .from('drivers').update({ status: 'On Trip' }).eq('id', driver.id);
  if (e3) return { ok: false, reason: e3.message };

  return { ok: true };
}

export async function completeTrip(tripId, finalOdometer, fuelConsumed) {
  const bundle = await fetchTripBundle(tripId);
  if (bundle.error) return { ok: false, reason: bundle.error };

  const { trip, vehicle, driver } = bundle;
  const check = canCompleteTrip(trip, finalOdometer, fuelConsumed);
  if (!check.ok) return check;

  const { error: e1 } = await supabase
    .from('trips')
    .update({
      status: 'Completed',
      final_odometer: finalOdometer,
      fuel_consumed: fuelConsumed,
    })
    .eq('id', tripId);
  if (e1) return { ok: false, reason: e1.message };

  const { error: e2 } = await supabase
    .from('vehicles')
    .update({ status: 'Available', odometer: finalOdometer })
    .eq('id', vehicle.id);
  if (e2) return { ok: false, reason: e2.message };

  const { error: e3 } = await supabase
    .from('drivers').update({ status: 'Available' }).eq('id', driver.id);
  if (e3) return { ok: false, reason: e3.message };

  return { ok: true };
}

export async function cancelTrip(tripId) {
  const bundle = await fetchTripBundle(tripId);
  if (bundle.error) return { ok: false, reason: bundle.error };

  const { trip, vehicle, driver } = bundle;
  const check = canCancelTrip(trip);
  if (!check.ok) return check;

  const { error: e1 } = await supabase
    .from('trips').update({ status: 'Cancelled' }).eq('id', tripId);
  if (e1) return { ok: false, reason: e1.message };

  const { error: e2 } = await supabase
    .from('vehicles').update({ status: 'Available' }).eq('id', vehicle.id);
  if (e2) return { ok: false, reason: e2.message };

  const { error: e3 } = await supabase
    .from('drivers').update({ status: 'Available' }).eq('id', driver.id);
  if (e3) return { ok: false, reason: e3.message };

  return { ok: true };
}