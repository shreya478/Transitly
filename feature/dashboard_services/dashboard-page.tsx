import { KpiCard } from "./KpiCard";
import { getMockKPIs } from "./dashboardService";
import { getMockVehicles, type VehicleStatus } from "./vehicleService";
import { getMockTrips, type TripStatus } from "./tripService";
import { getMockDrivers } from "./driverService";

// ── Icon components ────────────────────────────────────────────────────────
function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      {children}
    </svg>
  );
}

function VehicleIcon() {
  return (
    <IconWrap>
      <path d="M3 13.5V11l2-5h10l2 5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 13.5h14a1 1 0 0 1 1 1V18H4v-3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
    </IconWrap>
  );
}

function TripIcon() {
  return (
    <IconWrap>
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrap>
  );
}

function MaintenanceIcon() {
  return (
    <IconWrap>
      <path d="M14.5 6.5a4 4 0 0 0-5.6 4.8l-4.9 4.9a1.5 1.5 0 0 0 2.1 2.1l4.9-4.9a4 4 0 0 0 4.8-5.6l-2 2-2.1-2.1 2.8-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </IconWrap>
  );
}

function DriverIcon() {
  return (
    <IconWrap>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconWrap>
  );
}

function FuelIcon() {
  return (
    <IconWrap>
      <path d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V8l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconWrap>
  );
}

function ReportsIcon() {
  return (
    <IconWrap>
      <path d="M9 17H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 17v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2H9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </IconWrap>
  );
}

function GaugeIcon() {
  return (
    <IconWrap>
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </IconWrap>
  );
}

// ── Status helpers ─────────────────────────────────────────────────────────
const VEHICLE_STATUS_COLORS: Record<VehicleStatus, { bg: string; text: string; ring: string }> = {
  Available:  { bg: "bg-emerald-500/15", text: "text-emerald-400", ring: "ring-emerald-500/30" },
  "On Trip":  { bg: "bg-cyan-500/15",    text: "text-cyan-400",    ring: "ring-cyan-500/30"    },
  "In Shop":  { bg: "bg-amber-500/15",   text: "text-amber-400",   ring: "ring-amber-500/30"   },
  Retired:    { bg: "bg-slate-500/15",   text: "text-slate-400",   ring: "ring-slate-500/30"   },
};

const TRIP_STATUS_COLORS: Record<TripStatus, { bg: string; text: string; ring: string }> = {
  Dispatched: { bg: "bg-cyan-500/15",    text: "text-cyan-400",    ring: "ring-cyan-500/30"    },
  Draft:      { bg: "bg-slate-500/15",   text: "text-slate-400",   ring: "ring-slate-500/30"   },
  Completed:  { bg: "bg-emerald-500/15", text: "text-emerald-400", ring: "ring-emerald-500/30" },
  Cancelled:  { bg: "bg-red-500/15",     text: "text-red-400",     ring: "ring-red-500/30"     },
};

function StatusPill({ status, colors }: { status: string; colors: { bg: string; text: string; ring: string } }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}>
      {status}
    </span>
  );
}

// ── Quick Nav card ─────────────────────────────────────────────────────────
function QuickNavCard({
  href,
  icon,
  title,
  description,
  accent = "emerald",
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "emerald" | "cyan" | "amber" | "violet" | "rose" | "slate";
}) {
  const accentMap = {
    emerald: "group-hover:border-emerald-500/30 group-hover:shadow-emerald-900/20",
    cyan:    "group-hover:border-cyan-500/30    group-hover:shadow-cyan-900/20",
    amber:   "group-hover:border-amber-500/30   group-hover:shadow-amber-900/20",
    violet:  "group-hover:border-violet-500/30  group-hover:shadow-violet-900/20",
    rose:    "group-hover:border-rose-500/30    group-hover:shadow-rose-900/20",
    slate:   "group-hover:border-slate-500/30   group-hover:shadow-slate-900/20",
  };
  const iconBgMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    cyan:    "bg-cyan-500/10    text-cyan-400    ring-cyan-500/20",
    amber:   "bg-amber-500/10   text-amber-400   ring-amber-500/20",
    violet:  "bg-violet-500/10  text-violet-400  ring-violet-500/20",
    rose:    "bg-rose-500/10    text-rose-400    ring-rose-500/20",
    slate:   "bg-slate-500/10   text-slate-400   ring-slate-500/20",
  };

  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-800/40 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-slate-800/60 hover:shadow-xl ${accentMap[accent]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
      <div className="relative flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconBgMap[accent]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>
    </a>
  );
}

// ── Fleet Status Bar ───────────────────────────────────────────────────────
function FleetStatusBar({ vehicles }: { vehicles: ReturnType<typeof getMockVehicles> }) {
  const total = vehicles.length;
  if (total === 0) return null;

  const counts: Record<VehicleStatus, number> = {
    Available: 0,
    "On Trip": 0,
    "In Shop": 0,
    Retired: 0,
  };
  vehicles.forEach((v) => { counts[v.status]++; });

  const segments: { status: VehicleStatus; color: string; count: number }[] = [
    { status: "Available", color: "bg-emerald-500", count: counts.Available },
    { status: "On Trip",   color: "bg-cyan-500",    count: counts["On Trip"] },
    { status: "In Shop",   color: "bg-amber-500",   count: counts["In Shop"] },
    { status: "Retired",   color: "bg-slate-600",   count: counts.Retired },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 p-5 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-4">Fleet Distribution</h3>
      {/* Bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-700/50">
        {segments.map((seg) =>
          seg.count > 0 ? (
            <div
              key={seg.status}
              className={`${seg.color} transition-all duration-500`}
              style={{ width: `${(seg.count / total) * 100}%` }}
            />
          ) : null
        )}
      </div>
      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {segments.map((seg) => (
          <div key={seg.status} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${seg.color}`} />
            <span className="text-xs text-slate-400">
              {seg.status}{" "}
              <span className="font-semibold text-white">{seg.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export function DashboardPage() {
  const kpis = getMockKPIs();
  const vehicles = getMockVehicles();
  const trips = getMockTrips();
  const drivers = getMockDrivers();

  // Recent trips — last 5 for the activity feed
  const recentTrips = trips.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Hero header ── */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 px-6 py-8 shadow-2xl ring-1 ring-white/5 sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 right-1/3 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Fleet Operations
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Dashboard Overview
                </h1>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Real-time fleet snapshot — vehicles, trips, drivers, and operational health at a glance.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Utilization</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">{kpis.fleetUtilizationPercent}%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Fleet Size</p>
                  <p className="mt-1 text-2xl font-bold text-cyan-400">{kpis.totalVehicles}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── KPI Grid ── */}
        <section aria-label="Key performance indicators">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            KPI Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard title="Active Vehicles" value={kpis.activeVehicles} icon={<VehicleIcon />} />
            <KpiCard title="Available Vehicles" value={kpis.availableVehicles} icon={<VehicleIcon />} />
            <KpiCard title="Vehicles in Shop" value={kpis.maintenanceVehicles} icon={<MaintenanceIcon />} accentClass="text-amber-400" />
            <KpiCard title="Fleet Utilization" value={`${kpis.fleetUtilizationPercent}%`} icon={<GaugeIcon />} accentClass="text-cyan-400" />
            <KpiCard title="Active Trips" value={kpis.activeTrips} icon={<TripIcon />} />
            <KpiCard title="Pending Trips" value={kpis.pendingTrips} icon={<TripIcon />} accentClass="text-slate-300" />
            <KpiCard title="Drivers on Duty" value={kpis.driversOnDuty} icon={<DriverIcon />} />
            <KpiCard title="Total Drivers" value={drivers.length} icon={<DriverIcon />} accentClass="text-violet-400" />
          </div>
        </section>

        {/* ── Quick Navigation ── */}
        <section aria-label="Quick navigation">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <QuickNavCard href="/vehicles" icon={<VehicleIcon />} title="Vehicles" description="Manage fleet assets & status" accent="emerald" />
            <QuickNavCard href="/trips" icon={<TripIcon />} title="Trips" description="Dispatch & track shipments" accent="cyan" />
            <QuickNavCard href="/drivers" icon={<DriverIcon />} title="Drivers" description="Licenses, assignments & roster" accent="violet" />
            <QuickNavCard href="/fuel" icon={<FuelIcon />} title="Fuel & Expenses" description="Log fuel usage & costs" accent="amber" />
            <QuickNavCard href="/maintenance" icon={<MaintenanceIcon />} title="Maintenance" description="Work orders & service history" accent="rose" />
            <QuickNavCard href="/reports" icon={<ReportsIcon />} title="Reports" description="ROI analysis & fleet analytics" accent="slate" />
          </div>
        </section>

        {/* ── Two-column: Recent Activity + Fleet Status ── */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recent Activity — spans 3 cols */}
          <section aria-label="Recent trip activity" className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div>
                  <h2 className="text-base font-semibold text-white">Recent Activity</h2>
                  <p className="mt-0.5 text-xs text-slate-500">Latest trip updates across the fleet</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 ring-1 ring-cyan-500/20">
                  {trips.length} trips
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {recentTrips.map((trip) => {
                  const colors = TRIP_STATUS_COLORS[trip.status];
                  return (
                    <div key={trip.id} className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-slate-700/30">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-700/60 text-slate-400">
                        <TripIcon />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {trip.source} → {trip.destination}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {trip.vehicleId} · {trip.cargoWeight} kg · {trip.plannedDistance} km
                        </p>
                      </div>
                      <StatusPill status={trip.status} colors={colors} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Fleet Status — spans 2 cols */}
          <div className="space-y-6 lg:col-span-2">
            <FleetStatusBar vehicles={vehicles} />

            {/* Driver Status summary */}
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 p-5 backdrop-blur-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-4">Driver Status</h3>
              <div className="space-y-3">
                {(["Available", "On Trip", "Off Duty"] as const).map((status) => {
                  const count = drivers.filter((d) => d.status === status).length;
                  const total = drivers.length;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const colors = {
                    Available: "bg-emerald-500",
                    "On Trip": "bg-cyan-500",
                    "Off Duty": "bg-slate-600",
                  };
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">{status}</span>
                        <span className="text-xs font-semibold text-white">{count}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-700/50">
                        <div
                          className={`h-full rounded-full ${colors[status]} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;