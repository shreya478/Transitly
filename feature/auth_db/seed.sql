-- Vehicles
insert into vehicles (
  registration_number,
  name,
  type,
  max_load_capacity,
  odometer,
  acquisition_cost,
  region,
  status
)
values
('GJ01AB1234', 'Ashok Leyland 1618', 'Truck', 16000, 45230, 2500000, 'Ahmedabad', 'Available'),
('GJ05CD5678', 'Tata Ace Gold', 'Mini Truck', 1200, 18340, 650000, 'Gandhinagar', 'On Trip'),
('GJ18EF9012', 'Eicher Pro 2049', 'Truck', 4900, 78210, 1800000, 'Vadodara', 'In Shop'),
('GJ27GH3456', 'Mahindra Bolero Pickup', 'Pickup', 1700, 35600, 950000, 'Rajkot', 'Available');

-- Drivers
insert into drivers (
  name,
  license_number,
  license_category,
  license_expiry,
  contact_number,
  trip_completion_pct,
  status
)
values
('Rahul Sharma', 'DL123456789', 'HMV', '2028-05-15', '9876543210', 98, 'Available'),
('Priya Patel', 'DL987654321', 'LMV', '2027-11-20', '9876543211', 100, 'On Trip'),
('Amit Verma', 'DL456789123', 'HMV', '2026-08-10', '9876543212', 95, 'Available'),
('Neha Singh', 'DL741852963', 'LMV', '2027-02-28', '9876543213', 99, 'Off Duty');

-- Trips
insert into trips (
  source,
  destination,
  vehicle_id,
  driver_id,
  cargo_weight,
  planned_distance,
  final_odometer,
  fuel_consumed,
  status,
  eta
)
values
(
  'Ahmedabad',
  'Surat',
  (select id from vehicles where registration_number = 'GJ01AB1234'),
  (select id from drivers where license_number = 'DL123456789'),
  8500,
  270,
  45500,
  45,
  'Completed',
  'Delivered'
),
(
  'Gandhinagar',
  'Vadodara',
  (select id from vehicles where registration_number = 'GJ05CD5678'),
  (select id from drivers where license_number = 'DL987654321'),
  900,
  120,
  null,
  null,
  'Dispatched',
  '2 hours'
),
(
  'Rajkot',
  'Jamnagar',
  (select id from vehicles where registration_number = 'GJ27GH3456'),
  (select id from drivers where license_number = 'DL456789123'),
  1200,
  90,
  null,
  null,
  'Draft',
  'Pending'
);

-- Maintenance Logs
insert into maintenance_logs (
  vehicle_id,
  service_type,
  cost,
  service_date,
  status
)
values
(
  (select id from vehicles where registration_number='GJ18EF9012'),
  'Engine Service',
  15000,
  current_date,
  'Active'
),
(
  (select id from vehicles where registration_number='GJ01AB1234'),
  'Oil Change',
  3500,
  current_date - interval '30 days',
  'Completed'
);

-- Fuel Logs
insert into fuel_logs (
  vehicle_id,
  liters,
  cost,
  log_date
)
values
(
  (select id from vehicles where registration_number='GJ01AB1234'),
  120,
  12600,
  current_date
),
(
  (select id from vehicles where registration_number='GJ05CD5678'),
  45,
  4725,
  current_date
);

-- Expenses
insert into expenses (
  trip_id,
  vehicle_id,
  toll,
  other
)
values
(
  (select id from trips where source='Ahmedabad' and destination='Surat' limit 1),
  (select id from vehicles where registration_number='GJ01AB1234'),
  850,
  300
),
(
  (select id from trips where source='Gandhinagar' and destination='Vadodara' limit 1),
  (select id from vehicles where registration_number='GJ05CD5678'),
  250,
  100
);

-- Settings
insert into settings (
  depot_name,
  currency,
  distance_unit
)
values (
  'Gandhinagar Depot GJ4',
  'INR (₹)',
  'Kilometers'
);


