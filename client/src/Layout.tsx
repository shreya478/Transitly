import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

// ── Types ──────────────────────────────────────────────────────────────────
type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// ── Icon wrapper ───────────────────────────────────────────────────────────
function LIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      {children}
    </svg>
  );
}

// ── Route → page title mapping ─────────────────────────────────────────────
const PAGE_TITLES: Record<string, string> = {
  "/dashboard":   "Overview",
  "/reports":     "Reports & Analytics",
  "/vehicles":    "Vehicles",
  "/trips":       "Trips",
  "/drivers":     "Drivers",
  "/fuel":        "Fuel & Expenses",
  "/maintenance": "Maintenance",
  "/settings":    "Settings",
  "/profile":     "Profile",
};

// ── Nav sections ───────────────────────────────────────────────────────────
const NAV_SECTIONS: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        to: "/dashboard",
        label: "Overview",
        icon: (
          <LIcon>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </LIcon>
        ),
      },
      {
        to: "/reports",
        label: "Reports",
        icon: (
          <LIcon>
            <path d="M9 17H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 17v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2H9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </LIcon>
        ),
      },
    ],
  },
  {
    title: "Fleet",
    items: [
      {
        to: "/vehicles",
        label: "Vehicles",
        icon: (
          <LIcon>
            <path d="M3 13.5V11l2-5h10l2 5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 13.5h14a1 1 0 0 1 1 1V18H4v-3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
            <path d="M16.5 18.5a1.5 1.5 0 1 0 0-.01" stroke="currentColor" strokeWidth="1.8" />
          </LIcon>
        ),
      },
      {
        to: "/trips",
        label: "Trips",
        icon: (
          <LIcon>
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </LIcon>
        ),
      },
      {
        to: "/drivers",
        label: "Drivers",
        icon: (
          <LIcon>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </LIcon>
        ),
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        to: "/fuel",
        label: "Fuel & Expenses",
        icon: (
          <LIcon>
            <path d="M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 10h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V8l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </LIcon>
        ),
      },
      {
        to: "/maintenance",
        label: "Maintenance",
        icon: (
          <LIcon>
            <path d="M14.5 6.5a4 4 0 0 0-5.6 4.8l-4.9 4.9a1.5 1.5 0 0 0 2.1 2.1l4.9-4.9a4 4 0 0 0 4.8-5.6l-2 2-2.1-2.1 2.8-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </LIcon>
        ),
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        to: "/settings",
        label: "Settings",
        icon: (
          <LIcon>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          </LIcon>
        ),
      },
    ],
  },
];

// ── Helper: user initials ──────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const USER_NAME = "John Doe";
const USER_ROLE = "Fleet Ops Admin";

// ── Layout ─────────────────────────────────────────────────────────────────
export function Layout() {
  const location = useLocation();
  const { settings } = useTheme();
  const pageTitle = PAGE_TITLES[location.pathname] || "Transitly";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface-base text-text-primary transition-colors duration-300">
      {/* ── Sidebar ── */}
      <aside className={`flex ${settings.compactSidebar ? 'w-20' : 'w-64'} shrink-0 flex-col border-r border-border-default bg-surface-raised transition-all duration-300`}>
        {/* Brand */}
        <div className="flex h-16 items-center justify-center gap-3 px-6 border-b border-border-default">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-md shadow-emerald-900/20 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
              <path d="M3 17l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {!settings.compactSidebar && (
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">Transitly</span>
          )}
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6" aria-label="Main navigation">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {!settings.compactSidebar && (
                <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    title={settings.compactSidebar ? label : undefined}
                    className={({ isActive }) =>
                      [
                        "flex items-center rounded-[14px] px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        settings.compactSidebar ? "justify-center" : "gap-3",
                        isActive
                          ? "bg-[var(--icon-bg-emerald)] text-[var(--icon-text-emerald)]"
                          : "text-text-secondary hover:bg-border-subtle hover:text-text-primary",
                      ].join(" ")
                    }
                  >
                    {icon}
                    {!settings.compactSidebar && label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Profile footer */}
        <div className="border-t border-border-default p-4">
          <Link
            to="/profile"
            className={`flex items-center rounded-2xl p-2 transition-all duration-200 hover:bg-border-subtle ${settings.compactSidebar ? 'justify-center' : 'gap-3'}`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-[11px] font-bold text-white shadow-sm">
              {getInitials(USER_NAME)}
            </div>
            {!settings.compactSidebar && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{USER_NAME}</p>
                <p className="text-[11px] font-medium text-text-muted truncate">{USER_ROLE}</p>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* ── Right panel (top bar + content) ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-default bg-surface-overlay px-8 backdrop-blur-xl z-10 transition-colors duration-300">
          {/* Left: page title */}
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg font-bold text-text-primary">{pageTitle}</h1>
          </div>

          {/* Right: search + notifications + profile */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <svg viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search…"
                className="h-10 w-64 rounded-full border border-border-subtle bg-surface-base pl-10 pr-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none ring-0 transition-all focus:border-[var(--icon-text-emerald)] focus:ring-2 focus:ring-[var(--icon-bg-emerald)]"
              />
            </div>

            {/* Notification bell */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-border-subtle hover:text-text-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Profile avatar */}
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-white transition-transform hover:scale-105 shadow-sm"
            >
              {getInitials(USER_NAME)}
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-surface-base">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
