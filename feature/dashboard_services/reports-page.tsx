import { useState, useMemo } from 'react';
import { getMockKPIs } from './dashboardService';
import { getMockVehicles } from './vehicleService';
import { KpiCard } from './KpiCard';

// ── Icons ──────────────────────────────────────────────────────────────────
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H15a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 9v2M12 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Status helper ──────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const isOk = status === 'Available' || status === 'On Trip';
  const isWarn = status === 'In Shop';
  const isBad = status === 'Retired';

  const classes = [
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider',
    isOk && 'bg-[var(--icon-bg-emerald)] text-[var(--icon-text-emerald)] ring-1 ring-[var(--icon-bg-emerald)]',
    isWarn && 'bg-[var(--icon-bg-amber)] text-[var(--icon-text-amber)] ring-1 ring-[var(--icon-bg-amber)]',
    isBad && 'bg-[var(--icon-bg-slate)] text-[var(--icon-text-slate)] ring-1 ring-[var(--icon-bg-slate)]',
  ].filter(Boolean).join(' ');

  return <span className={classes}>{status}</span>;
}

// ── Mock Logic ─────────────────────────────────────────────────────────────
const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const calculateVehicleROI = (revenue: number, fuelCost: number, maintCost: number, acquisition: number) => {
  if (acquisition <= 0) return 0;
  const net = revenue - (fuelCost + maintCost);
  return Math.round((net / acquisition) * 100);
};

export function ReportsPage() {
  const kpis = getMockKPIs();
  const allVehicles = getMockVehicles();
  const [filterType, setFilterType] = useState<string>('all');

  const vehicles = useMemo(() => {
    if (filterType === 'all') return allVehicles;
    return allVehicles.filter(v => v.type === filterType);
  }, [allVehicles, filterType]);

  // Aggregate stats
  const totalFleetValue = vehicles.reduce((sum, v) => sum + v.acquisitionCost, 0);
  const avgROI = vehicles.length > 0
    ? vehicles.reduce((sum, v) => sum + calculateVehicleROI(v.maxLoadCapacity * 10, v.odometer * 0.15, 0, v.acquisitionCost), 0) / vehicles.length
    : 0;
  const activeAlerts = kpis.maintenanceVehicles + kpis.pendingTrips;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ── Header ── */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">Analytics</p>
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Financial Reports
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-text-secondary">Filter Type:</span>
            <select
              className="rounded-[12px] border border-border-default bg-surface-raised px-4 py-2 text-sm font-semibold text-text-primary outline-none ring-0 focus:border-[var(--icon-text-emerald)]"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Vehicles</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </header>

        {/* ── Metric Grid ── */}
        <section aria-label="Financial overview">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <KpiCard
              title="Total Fleet Asset Value"
              value={formatCurrency(totalFleetValue)}
              icon={<WalletIcon />}
              accent="emerald"
            />
            <KpiCard
              title="Avg Projected ROI"
              value={`${Math.round(avgROI)}%`}
              icon={<ChartIcon />}
              accent={avgROI > 10 ? 'cyan' : 'rose'}
            />
            <KpiCard
              title="Operational Alerts"
              value={activeAlerts}
              icon={<AlertIcon />}
              accent="amber"
            />
          </div>
        </section>

        {/* ── Vehicle ROI table ── */}
        <section aria-label="Vehicle ROI report">
          <div className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm">
            {/* Table header */}
            <div className="flex items-center justify-between border-b border-border-default px-7 py-5">
              <div>
                <h2 className="font-display text-lg font-bold text-text-primary">Vehicle ROI Report</h2>
                <p className="mt-1 text-xs font-medium text-text-muted">Mock revenue/cost projection per asset</p>
              </div>
              <span className="rounded-full bg-[var(--icon-bg-emerald)] px-3 py-1 text-[11px] font-bold text-[var(--icon-text-emerald)] ring-1 ring-[var(--icon-bg-emerald)]">
                {vehicles.length} vehicles
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="px-7 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Registration</th>
                    <th className="px-7 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Model</th>
                    <th className="px-7 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Type</th>
                    <th className="px-7 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Acquisition Cost</th>
                    <th className="px-7 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Status</th>
                    <th className="px-7 py-4 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Est. ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {vehicles.map((vehicle) => {
                    const mockRevenue = vehicle.maxLoadCapacity * 10;
                    const mockFuelAndMaint = vehicle.odometer * 0.15;
                    const roi = calculateVehicleROI(mockRevenue, mockFuelAndMaint, 0, vehicle.acquisitionCost);
                    const roiPositive = roi >= 0;

                    return (
                      <tr
                        key={vehicle.id}
                        className="group transition-colors duration-150 hover:bg-border-subtle"
                      >
                        {/* Registration */}
                        <td className="px-7 py-4">
                          <span className="font-mono text-sm font-bold text-text-primary">
                            {vehicle.registrationNumber}
                          </span>
                        </td>

                        {/* Model */}
                        <td className="px-7 py-4 text-sm font-semibold text-text-primary">
                          {vehicle.nameModel}
                        </td>

                        {/* Type */}
                        <td className="px-7 py-4 text-xs font-medium text-text-secondary">
                          {vehicle.type}
                        </td>

                        {/* Acquisition cost */}
                        <td className="px-7 py-4 tabular-nums text-sm font-medium text-text-primary">
                          {formatCurrency(vehicle.acquisitionCost)}
                        </td>

                        {/* Status pill */}
                        <td className="px-7 py-4">
                          <StatusPill status={vehicle.status} />
                        </td>

                        {/* ROI */}
                        <td className="px-7 py-4 text-right">
                          <span
                            className={[
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums tracking-wide',
                              roiPositive
                                ? 'bg-[var(--icon-bg-emerald)] text-[var(--icon-text-emerald)] ring-1 ring-[var(--icon-bg-emerald)]'
                                : 'bg-[var(--icon-bg-rose)] text-[var(--icon-text-rose)] ring-1 ring-[var(--icon-bg-rose)]',
                            ].join(' ')}
                          >
                            {roiPositive ? '+' : ''}{roi}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}