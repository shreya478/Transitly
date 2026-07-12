import React, { useState } from "react";

// ── Mock user data (swap with Supabase auth later) ─────────────────────────
const MOCK_USER = {
  name: "Parag Gupta",
  role: "Fleet Operations Admin",
  email: "parag@transitly.io",
  department: "Operations",
  accessLevel: "Full Access",
  joinedDate: "2024-11-15",
  timezone: "Asia/Kolkata (IST)",
  lastLogin: "2026-07-12T09:15:00+05:30",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Detail row ─────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="text-sm text-slate-200">{value}</span>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, accent = "text-emerald-400" }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-5 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${accent}`}>{value}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [user] = useState(MOCK_USER);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* ── Profile header ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 px-6 py-10 shadow-2xl ring-1 ring-white/5 sm:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />

          <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-2xl font-bold text-slate-950 shadow-lg shadow-emerald-900/40">
              {getInitials(user.name)}
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-slate-400">{user.role}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                  {user.accessLevel}
                </span>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 ring-1 ring-cyan-500/20">
                  {user.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick stats ── */}
        <section aria-label="Quick stats">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Oversight Summary
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Vehicles Managed" value={5} />
            <StatCard label="Trips Overseen" value={5} accent="text-cyan-400" />
            <StatCard label="Drivers Supervised" value={5} accent="text-violet-400" />
          </div>
        </section>

        {/* ── Account details ── */}
        <section aria-label="Account details">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 backdrop-blur-sm">
            <div className="border-b border-white/5 px-6 py-4">
              <h2 className="text-base font-semibold text-white">Account Details</h2>
              <p className="mt-0.5 text-xs text-slate-500">Your profile information and system access</p>
            </div>
            <div className="px-6 py-2">
              <DetailRow label="Email" value={user.email} />
              <DetailRow label="Department" value={user.department} />
              <DetailRow label="Access Level" value={user.accessLevel} />
              <DetailRow label="Timezone" value={user.timezone} />
              <DetailRow label="Joined" value={formatDate(user.joinedDate)} />
              <DetailRow label="Last Login" value={formatDate(user.lastLogin)} />
            </div>
          </div>
        </section>

        {/* ── Security ── */}
        <section aria-label="Security">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-800/50 backdrop-blur-sm">
            <div className="border-b border-white/5 px-6 py-4">
              <h2 className="text-base font-semibold text-white">Security</h2>
              <p className="mt-0.5 text-xs text-slate-500">Manage your authentication and security settings</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">Password</p>
                  <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                </div>
                <button className="rounded-lg bg-slate-700/60 px-4 py-2 text-xs font-semibold text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-slate-700 hover:text-white">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security</p>
                </div>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
                  Not Enabled
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
