export function ProfilePage() {
  const USER_NAME = "John Doe";
  const USER_EMAIL = "john.doe@transitly.com";
  const USER_ROLE = "Fleet Ops Admin";
  const USER_PHONE = "+1 (555) 019-2834";
  const USER_LOCATION = "San Francisco, CA";
  
  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-10">
        
        <header>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">System</p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            My Profile
          </h1>
        </header>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-4xl font-bold text-white shadow-lg">
            JD
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-3xl font-bold text-text-primary">{USER_NAME}</h2>
            <p className="mt-1 text-lg font-medium text-text-secondary">{USER_ROLE}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {USER_EMAIL}
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {USER_PHONE}
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {USER_LOCATION}
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <button className="rounded-[14px] bg-[var(--icon-bg-emerald)] px-6 py-2.5 text-sm font-bold text-[var(--icon-text-emerald)] transition-transform hover:scale-105">
              Edit Profile
            </button>
          </div>
        </section>

        {/* Activity or Permissions info */}
        <section className="overflow-hidden rounded-[24px] border border-border-default bg-surface-raised shadow-sm">
          <div className="border-b border-border-default px-7 py-5">
            <h2 className="font-display text-lg font-bold text-text-primary">Role & Permissions</h2>
            <p className="mt-1 text-xs font-medium text-text-muted">Your access level in Transitly</p>
          </div>
          <div className="p-7 text-sm font-medium text-text-secondary">
            <p>You have full administrative access to manage vehicles, dispatch trips, and configure system settings.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
