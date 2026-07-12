create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text check (
    role in ('fleet_manager','dispatcher','safety_officer','financial_analyst')
  ) not null,
  failed_login_attempts int default 0,
  is_locked boolean default false,
  created_at timestamptz default now()
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  registration_number text unique not null,
  name text not null,
  type text not null,
  max_load_capacity numeric not null,
  odometer numeric default 0,
  acquisition_cost numeric,
  region text,
  status text check (
    status in ('Available','On Trip','In Shop','Retired')
  ) default 'Available',
  created_at timestamptz default now()
);

create table drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  license_number text unique not null,
  license_category text,
  license_expiry date not null,
  contact_number text,
  trip_completion_pct numeric default 100,
  status text check (
    status in ('Available','On Trip','Off Duty','Suspended')
  ) default 'Available',
  created_at timestamptz default now()
);

-- NOTE: no safety_status column on purpose.
-- It is computed dynamically from license_expiry.

create table trips (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  destination text not null,
  vehicle_id uuid references vehicles(id),
  driver_id uuid references drivers(id),
  cargo_weight numeric not null,
  planned_distance numeric,
  final_odometer numeric,
  fuel_consumed numeric,
  status text check (
    status in ('Draft','Dispatched','Completed','Cancelled')
  ) default 'Draft',
  eta text,
  created_at timestamptz default now()
);

create table maintenance_logs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references vehicles(id),
  service_type text,
  cost numeric default 0,
  service_date date default current_date,
  status text check (
    status in ('Active','Completed')
  ) default 'Active',
  created_at timestamptz default now()
);

create table fuel_logs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references vehicles(id),
  liters numeric,
  cost numeric,
  log_date date default current_date
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id),
  vehicle_id uuid references vehicles(id),
  toll numeric default 0,
  other numeric default 0,
  created_at timestamptz default now()
);

create table settings (
  id uuid primary key default gen_random_uuid(),
  depot_name text default 'Gandhinagar Depot GJ4',
  currency text default 'INR (₹)',
  distance_unit text default 'Kilometers'
);