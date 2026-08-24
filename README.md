# Prism School Management System — Frontend

Enterprise, multi-tenant School Management System (SMS) frontend for Prism
Digital Company Ltd. One platform-level Super Admin manages many schools;
each school has its own School Admin, Teachers, Staff, Students, and
Parents. Platform-level and school-level responsibilities are always kept
separate — a School Admin can never act outside their own school.

> **Status:** Phase 0 — Architecture Foundation only. No business features
> (auth, dashboards, student management, etc.) are implemented yet. See
> "Implementation phases" below.

## Tech stack

- **Build:** Vite
- **UI:** React 19, Tailwind CSS v4
- **Routing:** React Router v7
- **Server state:** TanStack React Query
- **Client state:** Zustand (session/auth only — see State management)
- **HTTP:** Axios, via one centralized client
- **Forms:** React Hook Form + Zod
- **Icons/Charts:** Lucide React, Recharts
- **Notifications:** react-hot-toast
- **Lint/Format:** ESLint + Prettier

## Architecture

Feature-oriented. A feature owns everything about itself — its pages,
components, hooks, services, and route manifest — so another engineer can
open one folder and understand the whole feature.

```
src/
├── app/                 # composition root: entry point, providers, router, auth store
│   ├── main.jsx
│   ├── App.jsx
│   ├── providers/
│   ├── routers/
│   └── store/
├── components/          # cross-feature design system only — no business logic
│   ├── ui/               # Button, Card, Badge, Avatar, Tabs...
│   ├── loaders/           # Spinner, PageLoader, skeleton loaders...
│   ├── feedback/          # ErrorBoundary, EmptyState, ErrorState, LoadingState, NotFoundPage
│   └── layouts/           # role-shell layouts (AuthLayout, DashboardLayout, ...)
├── constants/            # ROUTES, ROLES, LAYOUTS, PERMISSIONS — single source of truth
├── manifestations/       # aggregates every feature's route manifest into one registry
├── services/             # apiClient.js — the one Axios instance, and cross-cutting services
├── lib/                  # queryClient, cn() (clsx+tailwind-merge), storage
├── errors/               # ErrorPage (router errorElement), ErrorContent, error.utils
├── hooks/                # generic, feature-agnostic hooks
├── utils/                # generic, feature-agnostic utilities
└── features/
    └── <feature>/
        ├── manifest.js    # this feature's routes: { path, component, layout, roles? }
        ├── components/
        ├── pages/
        ├── hooks/         # React Query hooks — components call these, never Axios directly
        ├── services/      # wraps services/apiClient.js for this feature's endpoints
        ├── schemas/       # Zod validation schemas
        └── index.js
```



## Setup

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL
npm run dev
```

## Environment variables

| Variable            | Purpose                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL the Axios client (`src/services/apiClient.js`) sends requests to. |

## Development commands

| Command           | Purpose                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Production build                   |
| `npm run preview` | Preview a production build locally |
| `npm run lint`    | ESLint                             |
| `npm run format`  | Prettier — writes formatting fixes |

## Routing strategy

Routes are never hardcoded inline. Each feature exports a `manifest`
(array of `{ path, component, layout, roles? }`); `manifestations/pages.js`
combines every feature's manifest into one `ALL_PAGES` registry;
`app/routers/createRoutes.js` groups those pages by `layout` (see
`constants/layouts.js`) and builds the React Router route tree from that —
no route is ever hand-listed twice. `ProtectedRoute` gates anything
requiring a signed-in user; `RoleGuard` further restricts by role once
`roles` is set on a page. Unmatched paths and route errors resolve to
`NotFoundPage` / `ErrorPage` rather than a blank screen.

## Authentication strategy (planned — Phase 1)

`app/store/authStore.js` is a minimal Zustand store holding only
`isAuthenticated`, `initializing`, `user`, `role`. Real login/logout,
token handling, and session persistence are intentionally deferred to the
Authentication Foundation.



## API strategy

All HTTP traffic goes through `src/services/apiClient.js`, a single Axios
instance. No component or hook calls Axios directly. A feature's
`services/<feature>.service.js` wraps `apiClient` for that feature's
endpoints; a feature's `hooks/use<Name>.js` wraps that service with React
Query. `apiClient`'s response interceptor normalizes every error into
`{ status, message, fieldErrors }` so raw API errors never reach the UI.

## State management strategy

- **React local state** — component-local UI state.
- **TanStack React Query** — all server state (fetching, caching,
  mutations, invalidation, retries).
- **Zustand** — only genuine cross-app client state: session/auth
  metadata and (once built) UI preferences like sidebar collapse state.
  Server data is never duplicated into Zustand.

## Testing strategy

Not yet set up — no business logic exists yet to test. When features
land, business logic (permission helpers, validation schemas, fee/result
calculations) stays in plain functions/hooks outside JSX specifically so
it stays unit-testable.

## Contribution guidelines

- Inspect existing code before adding anything — reuse before creating.
- One task/phase at a time; don't build ahead of the current phase.
- No placeholder files "completing" a module that has no real content.
- Centralize constants, routes, and permissions — never inline them.
- Run `npm run lint` and `npm run format` before committing.


