

interface KpiCardProps {
  title: string;
  value: string | number;
  /** Optional icon rendered in the accent chip */
  icon?: React.ReactNode;
  /** Optional accent colour mapping name. Defaults to emerald. */
  accent?: 'emerald' | 'cyan' | 'amber' | 'violet' | 'rose' | 'slate';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  accent = 'emerald',
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-surface-raised p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--icon-bg-${accent})] hover:border-[var(--icon-text-${accent})]`}>
      {/* Subtle gradient shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--glass-highlight)] to-transparent opacity-50" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
            {title}
          </p>
          <p className={`font-display mt-2 text-4xl font-bold tabular-nums tracking-tight text-[var(--icon-text-${accent})]`}>
            {value}
          </p>
        </div>

        {icon && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[var(--icon-bg-${accent})] text-[var(--icon-text-${accent})]`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};