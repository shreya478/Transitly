import { useState } from 'react';
import { useTheme } from '../ThemeContext';

export function SettingsPage() {
  const { settings, updateSetting, toggleTheme, resetSettings } = useTheme();
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleResetData = () => {
    resetSettings();
    setFeedbackMsg("Settings reset to defaults.");
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleClearCache = () => {
    localStorage.clear();
    setFeedbackMsg("Cache cleared. Reloading...");
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-10">
        
        <header>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">System</p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Settings
          </h1>
        </header>

        {feedbackMsg && (
          <div className="rounded-[16px] bg-[var(--icon-bg-emerald)] p-4 text-sm font-semibold text-[var(--icon-text-emerald)]">
            {feedbackMsg}
          </div>
        )}

        {/* Appearance Settings */}
        <section className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm">
          <div className="border-b border-border-default px-7 py-5">
            <h2 className="font-display text-lg font-bold text-text-primary">Appearance</h2>
            <p className="mt-1 text-xs font-medium text-text-muted">Customize how the application looks</p>
          </div>
          
          <div className="divide-y divide-border-subtle">
            <div className="flex items-center justify-between px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Dark Mode</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Switch between light and dark themes</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--icon-text-emerald)] focus:ring-offset-2 focus:ring-offset-surface-raised ${settings.darkMode ? 'bg-[var(--icon-text-emerald)]' : 'bg-border-subtle'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Compact Sidebar</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Reduce sidebar width to show icons only</p>
              </div>
              <button 
                onClick={() => updateSetting('compactSidebar', !settings.compactSidebar)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--icon-text-emerald)] focus:ring-offset-2 focus:ring-offset-surface-raised ${settings.compactSidebar ? 'bg-[var(--icon-text-emerald)]' : 'bg-border-subtle'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.compactSidebar ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm">
          <div className="border-b border-border-default px-7 py-5">
            <h2 className="font-display text-lg font-bold text-text-primary">Notifications</h2>
            <p className="mt-1 text-xs font-medium text-text-muted">Manage your alerts and communications</p>
          </div>
          
          <div className="divide-y divide-border-subtle">
            <div className="flex items-center justify-between px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Email Alerts</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Receive critical alerts via email</p>
              </div>
              <button 
                onClick={() => updateSetting('emailAlerts', !settings.emailAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--icon-text-emerald)] focus:ring-offset-2 focus:ring-offset-surface-raised ${settings.emailAlerts ? 'bg-[var(--icon-text-emerald)]' : 'bg-border-subtle'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Push Notifications</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Receive browser push notifications</p>
              </div>
              <button 
                onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--icon-text-emerald)] focus:ring-offset-2 focus:ring-offset-surface-raised ${settings.pushNotifications ? 'bg-[var(--icon-text-emerald)]' : 'bg-border-subtle'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Advanced */}
        <section className="overflow-hidden rounded-[24px] border border-[var(--icon-bg-rose)] bg-[var(--icon-bg-rose)]/10 shadow-sm">
          <div className="border-b border-[var(--icon-bg-rose)] px-7 py-5">
            <h2 className="font-display text-lg font-bold text-[var(--icon-text-rose)]">Advanced Settings</h2>
            <p className="mt-1 text-xs font-medium text-[var(--icon-text-rose)]/70">Proceed with caution</p>
          </div>
          
          <div className="divide-y divide-[var(--icon-bg-rose)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Reset Settings Data</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Reset all preferences to default values.</p>
              </div>
              <button 
                onClick={handleResetData}
                className="shrink-0 rounded-[12px] border border-[var(--icon-bg-rose)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--icon-text-rose)] transition-colors hover:bg-[var(--icon-bg-rose)]"
              >
                Reset Defaults
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-7 py-5">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Clear Browser Cache</h3>
                <p className="mt-1 text-xs font-medium text-text-muted">Clears all local storage and reloads the app.</p>
              </div>
              <button 
                onClick={handleClearCache}
                className="shrink-0 rounded-[12px] bg-[var(--icon-bg-rose)] px-4 py-2 text-sm font-semibold text-[var(--icon-text-rose)] transition-colors hover:bg-[var(--icon-text-rose)] hover:text-white"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
