import { KpiCard } from "./KpiCard";
import { getMockKPIs } from "./dashboardService";

function VehicleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3 13.5V11l2-5h10l2 5v2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.5h14a1 1 0 0 1 1 1V18H4v-3.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function TripIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6 5h11l2 3v10H6V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 8h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MaintenanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M14.5 6.5a4 4 0 0 0-5.6 4.8l-4.9 4.9a1.5 1.5 0 0 0 2.1 2.1l4.9-4.9a4 4 0 0 0 4.8-5.6l-2 2-2.1-2.1 2.8-2.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardPage() {
  const kpis = getMockKPIs();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-300">
            Fleet Operations
          </p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Dashboard Overview
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                Static fleet snapshot for operational visibility across vehicles and trips.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Utilization</p>
              <p className="mt-1 text-2xl font-semibold">{kpis.fleetUtilization}%</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard title="Active Vehicles" value={kpis.activeVehicles} icon={<VehicleIcon />} />
          <KpiCard title="Available Vehicles" value={kpis.availableVehicles} icon={<VehicleIcon />} />
          <KpiCard
            title="Vehicles in Maintenance"
            value={kpis.vehiclesInMaintenance}
            icon={<MaintenanceIcon />}
          />
          <KpiCard title="Active Trips" value={kpis.activeTrips} icon={<TripIcon />} />
          <KpiCard title="Pending Trips" value={kpis.pendingTrips} icon={<TripIcon />} />
          <KpiCard title="Fleet Utilization" value={`${kpis.fleetUtilization}%`} icon={<VehicleIcon />} />
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;