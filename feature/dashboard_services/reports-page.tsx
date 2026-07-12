import React from 'react';
import { getMockKPIs } from './dashboardService';
import { getMockVehicles, type VehicleStatus } from './vehicleService';
import { calculateVehicleROI, formatCurrency } from './formatters';
import { KpiCard } from './KpiCard';

// ── Status pill configuration ──────────────────────────────────────────────
const STATUS_CONFIG: Record<
  VehicleStatus,
  { label: string; classes: string }
> = {
  Available:  { label: 'Available', classes: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30' },
  'On Trip':  { label: 'Active',    classes: 'bg-cyan-500/15    text-cyan-400    ring-1 ring-cyan-500/30'    },
  'In Shop':  { label: 'Shop',      classes: 'bg-amber-500/15   text-amber-400   ring-1 ring-amber-500/30'   },
  Retired:    { label: 'Retired',   classes: 'bg-slate-500/15   text-slate-400   ring-1 ring-slate-500/30'   },
};

function StatusPill({ status }: { status: VehicleStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}

// ── KPI icon helpers ───────────────────────────────────────────────────────
function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 13.5V11l2-5h10l2 5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 13.5h14a1 1 0 0 1 1 1V18H4v-3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M14.5 6.5a4 4 0 0 0-5.6 4.8l-4.9 4.9a1.5 1.5 0 0 0 2.1 2.1l4.9-4.9a4 4 0 0 0 4.8-5.6l-2 2-2.1-2.1 2.8-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export const ReportsPage = () => {
  const kpis = getMockKPIs();
  const vehicles = getMockVehicles();

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Hero header ── */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 px-6 py-8 shadow-2xl ring-1 ring-white/5 sm:px-10">
          {/* Background accent blob */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 right-1/3 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              Fleet Operations
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Reports &amp; Analytics
                </h1>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Real-time fleet metrics, vehicle ROI analysis, and operational status at a glance.
                </p>
              </div>
              {/* Utilization badge */}
              <div className="w-fit rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Utilization</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">{kpis.fleetUtilizationPercent}%</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── KPI grid ── */}
        <section aria-label="Key performance indicators">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            KPI Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Active Vehicles" value={kpis.activeVehicles} icon={<TruckIcon />} />
            <KpiCard title="Available Vehicles" value={kpis.availableVehicles} icon={<TruckIcon />} />
            <KpiCard title="Vehicles in Shop" value={kpis.maintenanceVehicles} icon={<WrenchIcon />} accentClass="text-amber-400" />
            <KpiCard title="Fleet Utilization" value={`${kpis.fleetUtilizationPercent}%`} icon={<GaugeIcon />} accentClass="text-cyan-400" />
            <KpiCard title="Active Trips" value={kpis.activeTrips} icon={<RouteIcon />} />
            <KpiCard title="Pending Trips" value={kpis.pendingTrips} icon={<RouteIcon />} accentClass="text-slate-300" />
            <KpiCard title="Drivers on Duty" value={kpis.driversOnDuty} icon={<TruckIcon />} />
            {/* Static until Fuel module is built */}
            <KpiCard title="Avg Fuel Efficiency" value="8.4 km/L" icon={<GaugeIcon />} accentClass="text-cyan-400" />
          </div>
        </section>

        {/* ── Vehicle ROI table ── */}
        <section aria-label="Vehicle ROI report">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 backdrop-blur-sm">
            {/* Table header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div>
                <h2 className="text-base font-semibold text-white">Vehicle ROI Report</h2>
                <p className="mt-0.5 text-xs text-slate-500">Mock revenue/cost projection per asset</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                {vehicles.length} vehicles
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Registration</th>
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Model</th>
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Type</th>
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Acquisition Cost</th>
                    <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Status</th>
                    <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Est. ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vehicles.map((vehicle) => {
                    const mockRevenue = vehicle.maxLoadCapacity * 10;
                    const mockFuelAndMaint = vehicle.odometer * 0.15;
                    const roi = calculateVehicleROI(mockRevenue, mockFuelAndMaint, 0, vehicle.acquisitionCost);
                    const roiPositive = roi >= 0;

                    return (
                      <tr
                        key={vehicle.id}
                        className="group transition-colors duration-150 hover:bg-slate-700/40"
                      >
                        {/* Registration */}
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-semibold text-white">
                            {vehicle.registrationNumber}
                          </span>
                        </td>

                        {/* Model */}
                        <td className="px-6 py-4 text-slate-300">
                          {vehicle.nameModel}
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4 text-slate-400 text-xs">
                          {vehicle.type}
                        </td>

                        {/* Acquisition cost */}
                        <td className="px-6 py-4 tabular-nums text-slate-300">
                          {formatCurrency(vehicle.acquisitionCost)}
                        </td>

                        {/* Status pill */}
                        <td className="px-6 py-4">
                          <StatusPill status={vehicle.status} />
                        </td>

                        {/* ROI */}
                        <td className="px-6 py-4 text-right">
                          <span
                            className={[
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums',
                              roiPositive
                                ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                                : 'bg-red-500/10    text-red-400    ring-1 ring-red-500/20',
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
};