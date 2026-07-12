# Transitly
### Smart Transport Operations Platform

A centralized fleet management platform that digitizes vehicle, driver, dispatch, maintenance, and expense operations — built in 6 hours at a hackathon.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Backend / DB | Supabase (Postgres + Auth) |
| Routing | React Router v7 |
| Language | JavaScript / TypeScript |

---

## Features

- **Authentication** — Email/password login with role-based access and account lockout after 5 failed attempts
- **Role-Based Access Control** — Four roles: Fleet Manager, Dispatcher, Safety Officer, Financial Analyst. All pages visible to all roles; actions are gated per permission level
- **Vehicle Registry** — Full CRUD with unique registration enforcement and status tracking (Available / On Trip / In Shop / Retired)
- **Driver Management** — License expiry auto-computed as safety status; manual operational status toggling
- **Trip Dispatcher** — Full lifecycle (Draft → Dispatched → Completed → Cancelled) with enforced business rules at every transition
- **Maintenance Logs** — Auto-flips vehicle to In Shop on creation; restores to Available on close (respects Retired state)
- **Fuel & Expense Management** — Per-vehicle fuel logs and trip-linked expense tracking with auto-computed operational costs
- **Reports & Analytics** — Fuel efficiency, fleet utilization, operational cost, and vehicle ROI

---

## Business Rules Enforced

- Retired or In Shop vehicles never appear in the dispatch pool
- Drivers with expired licenses or Suspended status cannot be assigned to trips
- Cargo weight cannot exceed vehicle maximum load capacity
- A driver or vehicle already On Trip cannot be double-assigned
- Dispatching a trip automatically sets both vehicle and driver to On Trip
- Completing a trip requires final odometer and fuel consumed to be logged first
- Cancelling a dispatched trip restores both vehicle and driver to Available
- Closing a maintenance record restores vehicle to Available unless it is Retired

---

## Project Structure

```
Transitly/
├── client/                  ← Vite app (run all commands from here)
│   ├── src/
│   │   ├── auth/            ← Auth functions + RBAC matrix
│   │   ├── rules/           ← Business logic (pure JS, fully tested)
│   │   ├── services/        ← Supabase-wired service layer
│   │   ├── pages/           ← Profile, Settings pages
│   │   ├── AppRouter.tsx    ← All routes
│   │   └── Layout.tsx       ← Sidebar + topbar shell
│   └── .env                 ← Supabase keys (not committed)
├── feature/
│   ├── auth_db/             ← Schema, seed data, auth setup
│   ├── crud-ui/             ← Vehicle, Driver, Trip, Maintenance, Fuel pages
│   └── dashboard_services/  ← Dashboard, Reports, KPI components
└── README.md
```

---

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/shreya478/Transitly.git
cd Transitly/client
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file inside `client/`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**4. Set up the database**

Run `feature/auth_db/schema.sql` then `feature/auth_db/seed.sql` in your Supabase SQL editor.

**5. Start the dev server**
```bash
npm run dev
```

---

## Roles & Access

| Module | Fleet Manager | Dispatcher | Safety Officer | Financial Analyst |
|---|---|---|---|---|
| Dashboard | ✅ Full | 👁 View | 👁 View | 👁 View |
| Vehicles | ✅ Full | 👁 View | 👁 View | 👁 View |
| Drivers | ✅ Full | — | ✅ Full | — |
| Trips | ✅ Full | ✅ Full | 👁 View | 👁 View |
| Maintenance | ✅ Full | — | ✅ Full | 👁 View |
| Fuel & Expenses | ✅ Full | — | — | ✅ Full |
| Reports | ✅ Full | 👁 View | 👁 View | ✅ Full |
| Settings | ✅ Full | — | — | — |

---

## Team

Built in 6 hours — Hackathon 2026
