import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  /** Optional icon rendered in the accent chip */
  icon?: React.ReactNode;
  /** Optional accent colour class for the value. Defaults to emerald. */
  accentClass?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  accentClass = 'text-emerald-400',
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 p-5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-emerald-500/30 hover:bg-gray-900/70 hover:shadow-xl hover:shadow-emerald-900/20">
      {/* Subtle gradient shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {title}
          </p>
          <p className={`mt-2 text-3xl font-bold tabular-nums tracking-tight ${accentClass}`}>
            {value}
          </p>
        </div>

        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};