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
const TRIP_STATUS_COLORS: Record<TripStatus, { bg: string; text: string; ring: string }> = {
  Dispatched: { bg: "bg-[var(--icon-bg-cyan)]",    text: "text-[var(--icon-text-cyan)]",    ring: "ring-[var(--icon-bg-cyan)]"    },
  Draft:      { bg: "bg-[var(--icon-bg-slate)]",   text: "text-[var(--icon-text-slate)]",   ring: "ring-[var(--icon-bg-slate)]"   },
  Completed:  { bg: "bg-[var(--icon-bg-emerald)]", text: "text-[var(--icon-text-emerald)]", ring: "ring-[var(--icon-bg-emerald)]" },
  Cancelled:  { bg: "bg-[var(--icon-bg-rose)]",    text: "text-[var(--icon-text-rose)]",    ring: "ring-[var(--icon-bg-rose)]"     },
};

function StatusPill({ status, colors }: { status: string; colors: { bg: string; text: string; ring: string } }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ring-1 ${colors.bg} ${colors.text} ${colors.ring}`}>
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
  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-[24px] border border-border-default bg-surface-raised p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--icon-bg-${accent})] hover:border-[var(--icon-text-${accent})]`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--glass-highlight)] to-transparent opacity-50" />
      <div className="relative flex items-start gap-5">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[var(--icon-bg-${accent})] text-[var(--icon-text-${accent})] shadow-sm`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-text-primary">{title}</p>
          <p className="mt-1 text-xs font-medium text-text-muted">{description}</p>
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
    { status: "Available", color: "bg-[var(--icon-text-emerald)]", count: counts.Available },
    { status: "On Trip",   color: "bg-[var(--icon-text-cyan)]",    count: counts["On Trip"] },
    { status: "In Shop",   color: "bg-[var(--icon-text-amber)]",   count: counts["In Shop"] },
    { status: "Retired",   color: "bg-[var(--icon-text-slate)]",   count: counts.Retired },
  ];

  return (
    <div className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised p-6 shadow-sm">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted mb-5">Fleet Distribution</h3>
      {/* Bar */}
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-border-subtle shadow-inner">
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
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((seg) => (
          <div key={seg.status} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${seg.color} shadow-sm`} />
            <span className="text-xs font-medium text-text-secondary">
              {seg.status}{" "}
              <span className="font-bold text-text-primary ml-1">{seg.count}</span>
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
    <div className="min-h-screen px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Hero header ── */}
        <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-surface-raised to-surface-base px-8 py-10 shadow-lg border border-[var(--glass-border)] sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[var(--icon-bg-emerald)] blur-3xl opacity-50" />
          <div className="pointer-events-none absolute -bottom-10 right-1/3 h-56 w-56 rounded-full bg-[var(--icon-bg-cyan)] blur-2xl opacity-50" />

          <div className="relative">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--icon-text-emerald)]">
              Fleet Operations
            </p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
                  Dashboard Overview
                </h1>
                <p className="mt-3 max-w-xl text-base font-medium text-text-secondary">
                  Real-time fleet snapshot — vehicles, trips, drivers, and operational health at a glance.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="rounded-[20px] border border-[var(--glass-border)] bg-surface-overlay px-6 py-4 shadow-sm backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Utilization</p>
                  <p className="font-display mt-1 text-3xl font-bold text-[var(--icon-text-emerald)]">{kpis.fleetUtilizationPercent}%</p>
                </div>
                <div className="rounded-[20px] border border-[var(--glass-border)] bg-surface-overlay px-6 py-4 shadow-sm backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Fleet Size</p>
                  <p className="font-display mt-1 text-3xl font-bold text-[var(--icon-text-cyan)]">{kpis.totalVehicles}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── KPI Grid ── */}
        <section aria-label="Key performance indicators">
          <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted ml-2">
            KPI Overview
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <KpiCard title="Active Vehicles" value={kpis.activeVehicles} icon={<VehicleIcon />} />
            <KpiCard title="Available Vehicles" value={kpis.availableVehicles} icon={<VehicleIcon />} />
            <KpiCard title="Vehicles in Shop" value={kpis.maintenanceVehicles} icon={<MaintenanceIcon />} accent="amber" />
            <KpiCard title="Fleet Utilization" value={`${kpis.fleetUtilizationPercent}%`} icon={<GaugeIcon />} accent="cyan" />
            <KpiCard title="Active Trips" value={kpis.activeTrips} icon={<TripIcon />} />
            <KpiCard title="Pending Trips" value={kpis.pendingTrips} icon={<TripIcon />} accent="slate" />
            <KpiCard title="Drivers on Duty" value={kpis.driversOnDuty} icon={<DriverIcon />} />
            <KpiCard title="Total Drivers" value={drivers.length} icon={<DriverIcon />} accent="violet" />
          </div>
        </section>

        {/* ── Quick Navigation ── */}
        <section aria-label="Quick navigation">
          <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted ml-2">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            <QuickNavCard href="/vehicles" icon={<VehicleIcon />} title="Vehicles" description="Manage fleet assets & status" accent="emerald" />
            <QuickNavCard href="/trips" icon={<TripIcon />} title="Trips" description="Dispatch & track shipments" accent="cyan" />
            <QuickNavCard href="/drivers" icon={<DriverIcon />} title="Drivers" description="Licenses, assignments & roster" accent="violet" />
            <QuickNavCard href="/fuel" icon={<FuelIcon />} title="Fuel & Expenses" description="Log fuel usage & costs" accent="amber" />
            <QuickNavCard href="/maintenance" icon={<MaintenanceIcon />} title="Maintenance" description="Work orders & service history" accent="rose" />
            <QuickNavCard href="/reports" icon={<ReportsIcon />} title="Reports" description="ROI analysis & fleet analytics" accent="slate" />
          </div>
        </section>

        {/* ── Two-column: Recent Activity + Fleet Status ── */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Recent Activity — spans 3 cols */}
          <section aria-label="Recent trip activity" className="lg:col-span-3">
            <div className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm">
              <div className="flex items-center justify-between border-b border-border-default px-7 py-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-text-primary">Recent Activity</h2>
                  <p className="mt-1 text-xs font-medium text-text-muted">Latest trip updates across the fleet</p>
                </div>
                <span className="rounded-full bg-[var(--icon-bg-cyan)] px-3 py-1 text-[11px] font-bold text-[var(--icon-text-cyan)] ring-1 ring-[var(--icon-bg-cyan)]">
                  {trips.length} trips
                </span>
              </div>
              <div className="divide-y divide-border-subtle">
                {recentTrips.map((trip) => {
                  const colors = TRIP_STATUS_COLORS[trip.status];
                  return (
                    <div key={trip.id} className="flex items-center gap-5 px-7 py-4 transition-colors hover:bg-border-subtle">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--icon-bg-slate)] text-text-secondary">
                        <TripIcon />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-text-primary truncate">
                          {trip.source} → {trip.destination}
                        </p>
                        <p className="text-[11px] font-medium text-text-muted mt-0.5">
                          {trip.vehicleId} • {trip.cargoWeight} kg • {trip.plannedDistance} km
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
          <div className="space-y-8 lg:col-span-2">
            <FleetStatusBar vehicles={vehicles} />

            {/* Driver Status summary */}
            <div className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised p-6 shadow-sm">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted mb-5">Driver Status</h3>
              <div className="space-y-4">
                {(["Available", "On Trip", "Off Duty"] as const).map((status) => {
                  const count = drivers.filter((d) => d.status === status).length;
                  const total = drivers.length;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const colors = {
                    Available: "bg-[var(--icon-text-emerald)]",
                    "On Trip": "bg-[var(--icon-text-cyan)]",
                    "Off Duty": "bg-[var(--icon-text-slate)]",
                  };
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-text-secondary">{status}</span>
                        <span className="text-xs font-bold text-text-primary">{count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-border-subtle shadow-inner">
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