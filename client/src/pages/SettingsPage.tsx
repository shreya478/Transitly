import React, { useState } from "react";

// ── Toggle component ───────────────────────────────────────────────────────
function Toggle({
  enabled,
  onToggle,
  disabled = false,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onToggle}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-slate-900",
        enabled ? "bg-emerald-500" : "bg-slate-700",
        disabled ? "cursor-not-allowed opacity-50" : "",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
          enabled ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

// ── Setting row ────────────────────────────────────────────────────────────
function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 px-5 py-4">
      <div className="min-w-0 pr-4">
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function SettingsSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 backdrop-blur-sm">
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="p-6 space-y-3">{children}</div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* ── Header ── */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Configure your workspace preferences and system behavior.
          </p>
        </div>

        {/* ── Appearance ── */}
        <SettingsSection title="Appearance" subtitle="Customize the look and feel of your workspace">
          <SettingRow
            title="Dark Mode"
            description="Use the dark interface theme across the application"
          >
            <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </SettingRow>
          <SettingRow
            title="Compact Sidebar"
            description="Reduce sidebar width to show only icons"
          >
            <Toggle enabled={compactSidebar} onToggle={() => setCompactSidebar(!compactSidebar)} />
          </SettingRow>
        </SettingsSection>

        {/* ── Notifications ── */}
        <SettingsSection title="Notifications" subtitle="Control how you receive alerts and updates">
          <SettingRow
            title="Email Alerts"
            description="Receive email notifications for critical fleet events"
          >
            <Toggle enabled={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
          </SettingRow>
          <SettingRow
            title="Browser Push Notifications"
            description="Get real-time push notifications in your browser"
          >
            <Toggle enabled={pushNotifications} onToggle={() => setPushNotifications(!pushNotifications)} />
          </SettingRow>
        </SettingsSection>

        {/* ── Data & System ── */}
        <SettingsSection title="Data & System" subtitle="System configuration and data source settings">
          <SettingRow
            title="Auto-Refresh Dashboard"
            description="Automatically refresh KPI data every 30 seconds"
          >
            <Toggle enabled={autoRefresh} onToggle={() => setAutoRefresh(!autoRefresh)} />
          </SettingRow>
          <SettingRow
            title="Data Mode"
            description="Currently running with mock data for development"
          >
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
              Mock Data
            </span>
          </SettingRow>
          <SettingRow
            title="API Endpoint"
            description="Backend service URL for production data"
          >
            <span className="font-mono text-xs text-slate-500">
              Not configured
            </span>
          </SettingRow>
        </SettingsSection>

        {/* ── Danger Zone ── */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-red-500/20 bg-slate-800/50 backdrop-blur-sm">
            <div className="border-b border-red-500/10 px-6 py-4">
              <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
              <p className="mt-0.5 text-xs text-slate-500">Irreversible actions — proceed with caution</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-red-500/10 bg-slate-900/50 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">Reset All Mock Data</p>
                  <p className="text-xs text-slate-500">Restore all mock data to factory defaults</p>
                </div>
                <button className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 transition-colors hover:bg-red-500/20 hover:text-red-300">
                  Reset Data
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-red-500/10 bg-slate-900/50 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">Clear Local Cache</p>
                  <p className="text-xs text-slate-500">Remove all cached data and preferences</p>
                </div>
                <button className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 transition-colors hover:bg-red-500/20 hover:text-red-300">
                  Clear Cache
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
