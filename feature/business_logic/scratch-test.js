// This file is for testing the business logic functions in isolation

import { canDispatchTrip, canCompleteTrip, canCancelTrip } from './tripRules.js';
import { onMaintenanceCreate, onMaintenanceClose } from './maintenanceRules.js';
import { fuelEfficiency, vehicleROI } from './calculations.js';

// Test 1: capacity exceeded → should block
const vehicle1 = { status: 'Available', max_load_capacity: 500 };
const driver1 = { status: 'Available', license_expiry: '2028-12-01' };
const trip1 = { cargo_weight: 700 };
console.log('Test 1 (should fail - capacity):', canDispatchTrip(trip1, vehicle1, driver1));

// Test 2: everything valid → should pass
const trip2 = { cargo_weight: 300 };
console.log('Test 2 (should pass):', canDispatchTrip(trip2, vehicle1, driver1));

// Test 3: expired license → should block
const driver2 = { status: 'Available', license_expiry: '2020-01-01' };
console.log('Test 3 (should fail - expired license):', canDispatchTrip(trip2, vehicle1, driver2));

// Test 4: maintenance close on retired vehicle → should stay Retired
const retiredVehicle = { status: 'Retired' };
console.log('Test 4 (should stay Retired):', onMaintenanceClose(retiredVehicle));

// Test 5: ROI calc sanity check
console.log('Test 5 (ROI):', vehicleROI(50000, 5000, 3000, 400000));