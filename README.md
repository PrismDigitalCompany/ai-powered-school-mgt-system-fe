# SMS — School Management System (Frontend)

Frontend scaffold for the School Management System (SMS), built for the
product expansion from a results engine into a full School ERP (see the
product proposal this repo implements: admissions, academics, attendance,
fees, library, hostel, payroll, CBT, communication, analytics, and AI insights).

This is a **static frontend scaffold** — every screen renders with realistic
mock data (`src/data/mockData.js`) so the whole app is clickable today. It's
built to sit in front of the existing ASP.NET Core / EF Core backend; wiring
up real endpoints is a matter of replacing the mock data imports with API
calls (see [Connecting to the backend](#connecting-to-the-backend) below).

## Stack

| Concern       | Choice                                   |
|---------------|-------------------------------------------|
| Build tool    | Vite 8                                    |
| Framework     | React 18                                  |
| Styling       | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing       | React Router v7                           |
| Animation     | Framer Motion                             |
| Charts        | Recharts                                  |
| Icons         | lucide-react                              |
| Toasts        | react-hot-toast                           |

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173/
npm run build     # production build → dist/
npm run preview   # preview the production build
```

No environment variables are required to run the scaffold — everything is
mocked. See [Connecting to the backend](#connecting-to-the-backend) for the
next step.

## Demo logins

There's no real backend wired up yet, so `AuthContext` ships with demo
accounts would look this (see `src/context/AuthContext.jsx`). On the login screen you can
either type these credentials or just tap one of the "preview a role" buttons.

| Role     | Email               | Password    |
|----------|----------------------|-------------|
| Admin    | admin@sms.edu        | admin123    |
| Teacher  | teacher@sms.edu      | teacher123  |
| Student  | student@sms.edu      | student123  |
| Parent   | parent@sms.edu       | parent123   |

> Note: these are placeholder credentials for local demoing only — swap the
> domain/emails in `DEMO_USERS` (in `AuthContext.jsx`) for your school's own
> once real auth is wired up.

## Recent changes

The whole app — sidebar branding, browser tab title, landing page copy,
student IDs, demo login domain, and `localStorage` session key — has been
renamed from **SRMS** to **SMS (School Management System)** for consistency
with the product proposal.

## Project structure

```
src/
├── main.jsx                  # App entry — mounts BrowserRouter + AuthProvider
├── App.jsx                   # Full route tree for all four portals
├── index.css                 # Tailwind import + design tokens (@theme block)
│
├── context/
│   └── AuthContext.jsx       # Demo auth (session in localStorage) — swap for real API
│
├── routes/
│   ├── ProtectedRoute.jsx    # Guards a subtree by login + role
│   └── roleNav.js            # Single source of truth for each portal's sidebar
│
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx  # Sidebar + Topbar + animated <Outlet />
│   │   ├── Sidebar.jsx          # Role-aware nav, reads roleNav.js
│   │   ├── Topbar.jsx           # User menu, date, notifications
│   │   └── AuthLayout.jsx       # Split-screen layout for /login
│   └── common/                  # Shared building blocks used by every page:
│       ├── PageHeader.jsx       # Eyebrow + title + description + actions
│       ├── StatCard.jsx         # KPI card with icon + tone
│       ├── SectionCard.jsx      # Bordered content card with optional header
│       ├── DataTable.jsx        # Generic table (columns + rows + custom render)
│       ├── Badge.jsx            # Status pill (neutral/brass/ledger/rust tones)
│       ├── Button.jsx           # primary/brass/outline/ghost variants
│       ├── SearchInput.jsx      # Controlled search field
│       └── EmptyState.jsx       # Placeholder for empty lists
│       
|
├── pages/
│   ├── public/       # LandingPage, LoginPage, NotFoundPage
│   ├── admin/        # Registrar portal — 13 modules from the product proposal
│   ├── teacher/      # Teacher portal — classes, scores, attendance, reports
│   ├── student/      # Student portal — results, fees, library, CBT, timetable
│   └── parent/       # Parent portal — child's results, fees, report cards
│
└── data/
    └── mockData.js    # Every array of demo data used across all pages
```

### Why one `mockData.js` file?

Every page imports its data from `src/data/mockData.js` instead of hardcoding
inline arrays. This means:
- There's exactly one place to look when the data looks wrong.
- Swapping mock data for real API responses is a search-and-replace exercise,
  not a hunt through 30+ page files.
- Different pages that reference the same entity (e.g. a student's results
  appear on both the Student and Parent portals) stay in sync.

## Portals & routing

The app has four role-based portals, each behind its own path prefix and
guarded by `ProtectedRoute`:

| Portal             | Base path  | Who sees it                 |
|---------------------|-----------|------------------------------|
| Registrar (Admin)   | `/admin`   | School administrators       |
| Teacher             | `/teacher` | Lecturers / class teachers  |
| Student             | `/student` | Enrolled students           |
| Parent              | `/parent`  | Parents / guardians         |

Each portal's sidebar is generated from `src/routes/roleNav.js` — **to add or
remove a page from a portal's sidebar, edit that one file** rather than
touching `Sidebar.jsx`.

`ProtectedRoute` currently checks a mock session in `localStorage`
(`AuthContext`). If a logged-in teacher tries to visit `/admin`, they're
redirected back to `/teacher` rather than seeing a 403 page — this keeps the
demo friendly, but you may want a dedicated "not authorized" screen in
production.

## Design system

The visual identity (ink navy, brass gold, parchment cream, ledger green,
alert rust — paired with Source Serif 4 for display headings, Inter for body
text, and JetBrains Mono for data/IDs) continues the "registrar's ledger"
identity already established for the backend's Razor views, so the whole
product — old admin UI and new React portals — feels like one system.

All tokens live in `src/index.css` under the `@theme` block (Tailwind v4
generates utility classes like `bg-ink-900`, `text-brass-600`,
`border-ledger-500` directly from these). Change a hex value once there and
it propagates everywhere.

## Connecting to the backend

Everything currently reads from `src/data/mockData.js` and auth lives in
`localStorage` via `AuthContext`. To connect the real ASP.NET Core backend:

1. **Auth** — replace the `login` function body in
   `src/context/AuthContext.jsx` with a `fetch`/`axios` call to your
   `/api/auth/login` endpoint, and store the returned JWT instead of a demo
   session object.
2. **Data fetching** — each page currently does
   `import { students } from '../../data/mockData.js'`. Replace these with a
   data-fetching hook (e.g. `useEffect` + `fetch`, or React Query if you add
   it) that calls the matching backend endpoint, and keep the same shape
   (array of objects with the same keys) so the `DataTable`/`StatCard`
   components don't need to change.
3. **Environment config** — add a `.env` with `VITE_API_BASE_URL` and read it
   via `import.meta.env.VITE_API_BASE_URL` once real requests are added.

## Notes for the team

- Every page is a **shell with realistic mock data**, not a fully wired
  feature — forms don't currently persist (e.g. Score Entry, Attendance
  marking hold state in memory only). Treat this as a scaffold to build
  business logic into, not a finished product.
- Charts (`recharts`) and animations (`framer-motion`) are already wired up
  as examples on the Analytics, Attendance, and Dashboard pages — copy the
  pattern rather than introducing a second charting library.
- Run `npm run build` before pushing to confirm nothing broke — the whole
  app currently builds clean.


# Color System Documentation

**Project:** SMS — School Management System (Frontend)
**Applies to:** `src/index.css`
**Audience:** Everyone writing UI code in this repo

---

## 1. Purpose

This project defines its colors in one place — `src/index.css` — so that:

- Every screen looks like it belongs to the same product.
- Changing a color (e.g. rebranding, dark mode, client theming) means editing **one file**, not hunting through every component.
- No one needs to remember hex codes. You reach for a *name* (`bg-sidebar`, `text-error`) and Tailwind does the rest.

**The rule this whole system exists to enforce:**

> Never write a raw hex code, an arbitrary Tailwind value (`bg-[#4274D9]`), or a default Tailwind color (`bg-blue-500`) directly inside a component. Always use one of the semantic tokens defined below.

---

## 2. How the system is structured (two layers)

Our theme is built in **two layers**, both inside the `@theme` block in `src/index.css`.

### Layer 1 — Base palette (the raw colors)

These are the actual hex values. They're named after **where they were designed to be used**, not after abstract color families like "blue" or "gray":

```css
--sidebar-ink-900: #0B1849;
--sidebar-top-900: #E4B028;
--header-ink-900: #F0F5F9;
--navbar-ink-900: #FAF2F2;
--card-ink-900: #F1F6F9;
--dashboard-ink-900: #F1F6F9;
--footer-ink-900: #29668B;
--button-ink-900: #4274D9;
--success-ink-900: #4BC87F;
--error-ink-500: #BE1A1A;
--primary-ink-900: #3874FF;
--warning-ink-900: #FFBF00;
--background-ink-400: #EAECF0;
--border-line-ink-300: #D0D5DD;
--text-ink-white-200: #F8F9FC;
--spinner-ink-brass-500: #4274D9;
```

**You should almost never reference these directly in a component.** They exist so Layer 2 can point at them.

### Layer 2 — Semantic tokens (what you actually use)

These are the names you'll type in `className`. Each one points at a Layer 1 value using `var(...)`:

```css
--color-sidebar: var(--sidebar-ink-900);
--color-sidebar-top: var(--sidebar-top-900);
--color-sidebar-text: var(--sidebar-ink-text);
--color-header: var(--header-ink-900);
--color-navbar: var(--navbar-ink-900);
--color-card: var(--card-ink-900);
--color-dashboard: var(--dashboard-ink-900);
--color-text: var(--text-ink-white-200);
--color-spinner: var(--spinner-ink-brass-500);
--color-footer: var(--footer-ink-900);
--color-button: var(--button-ink-900);
--color-success: var(--success-ink-900);
--color-error: var(--error-ink-500);
--color-primary: var(--primary-ink-900);
--color-warning: var(--warning-ink-900);
--color-background: var(--background-ink-400);
--color-border-line: var(--border-line-ink-300);
```

Because these live under `@theme` with the `--color-` prefix, **Tailwind v4 auto-generates utility classes from them** — no config file, no build step, no plugin. Every name above becomes usable as `bg-*`, `text-*`, and `border-*` immediately:

| Token | Generates |
|---|---|
| `--color-sidebar` | `bg-sidebar`, `text-sidebar`, `border-sidebar` |
| `--color-success` | `bg-success`, `text-success`, `border-success` |
| `--color-error` | `bg-error`, `text-error`, `border-error` |

> **Why two layers instead of one?** If tomorrow the sidebar background changes from navy to charcoal, you edit **one line** (`--sidebar-ink-900`) and every component using `bg-sidebar` updates automatically. Nobody needs to touch a single `.jsx` file.

---

## 3. Full token reference

| Semantic class | Use for | Points at |
|---|---|---|
| `bg-sidebar` / `text-sidebar` | Sidebar background | `#0B1849` |
| `bg-sidebar-top` | Sidebar header/logo strip accent | `#E4B028` |
| `text-sidebar-text` | Text sitting on top of the sidebar | `#F8F9FC` |
| `bg-header` | Top bar / page header background | `#F0F5F9` |
| `bg-navbar` | Navigation bar background | `#FAF2F2` |
| `bg-card` | Card / panel background | `#F1F6F9` |
| `bg-dashboard` | Dashboard page background | `#F1F6F9` |
| `text-text` | Body text sitting on **dark** surfaces (sidebar, footer) | `#F8F9FC` |
| `text-spinner` / `border-spinner` | Loading spinner color | `#4274D9` |
| `bg-footer` | Footer background | `#29668B` |
| `bg-button` | Primary button background | `#4274D9` |
| `text-success` / `bg-success` | Success states (payment confirmed, saved) | `#4BC87F` |
| `text-error` / `bg-error` | Error states (failed, validation errors) | `#BE1A1A` |
| `text-primary` / `bg-primary` | Primary brand accent / links | `#3874FF` |
| `text-warning` / `bg-warning` | Warning states (pending, outstanding) | `#FFBF00` |
| `bg-background` | Page/app background | `#EAECF0` |
| `border-border-line` | Default border color (inputs, dividers, cards) | `#D0D5DD` |

> **Known gap:** there is currently no dedicated token for **body text on light backgrounds** (cards, forms, tables). `--color-text` is a near-white (`#F8F9FC`), meant for text on dark surfaces like the sidebar or footer — using `text-text` on a white card will be unreadable. Until this is added, use `text-slate-900`-style values *only as a temporary stopgap* and flag it in your PR, or ask whoever owns the theme to add `--color-text-body` (a dark value) before you ship the screen. Don't invent your own hex in the meantime.

---

## 4.Example on how to use it in a component

```jsx
// Correct — semantic tokens only
<aside className="bg-sidebar text-sidebar-text">
  <nav>…</nav>
</aside>

<header className="bg-header border-b border-border-line">…</header>

<div className="bg-card border border-border-line rounded-md p-5">
  <p className="text-success">Payment confirmed</p>
  <p className="text-error">Failed to save changes</p>
  <p className="text-warning">3 invoices outstanding</p>
</div>

<button className="bg-button text-sidebar-text px-4 py-2 rounded">
  Save
</button>
```

```jsx
// Wrong, never do any of this
<div style={{ backgroundColor: '#4274D9' }}>........</div>
<div className="bg-[#4274D9]">...</div>
<div className="bg-blue-500">...</div>   {/* Tailwind's default palette, not ours */}
```

### Example: the `Badge` component

The `Badge` component is a good reference for how a reusable component should map its own internal states to our semantic tokens, using opacity modifiers (`/10`, `/30`) to create tints and borders from a single flat color:

```jsx
const toneMap = {
  neutral: 'bg-background text-text-body border-border-line',
  primary: 'bg-primary/10 text-primary border-primary/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  success: 'bg-success/10 text-success border-success/30',
  error:   'bg-error/10 text-error border-error/30',
};

export default function Badge({ children, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5
        text-[11px] font-mono uppercase tracking-wide ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}
```

Use it like this:

```jsx
<Badge tone="success">Paid</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="error">Failed</Badge>
```

If you're building a component with multiple visual states (badges, alerts, buttons, status pills), **follow this pattern**: one `toneMap`/`variantMap` object at the top of the file, mapping a short state name to a string of semantic classes. Don't scatter conditional class logic through the JSX.

---

## 5. Adding a new color

If an existing token doesn't cover what you need:

1. **Check the table in Section 3 first.** Most needs are already covered.
2. If genuinely new, add it to **both layers** in `src/index.css`:
   ```css
   /* Layer 1 — base value */
   --tag-ink-500: #7C3AED;

   /* Layer 2 — semantic name */
   --color-tag: var(--tag-ink-500);
   ```
3. Name the semantic token after **what it represents**, not what it looks like — `--color-tag`, not `--color-purple`. Colors get rebranded; roles don't.
4. Mention the addition in your pull request description so the rest of the team knows a new token exists.

**Do not** add a color inline "just for this one component." If it's worth using, it's worth being a token; if it's not worth being a token, question whether you need it at all.

---

## 6. Enforcement — how we keep this from drifting

Tailwind will happily let you use its **entire default palette** (`slate-500`, `red-400`, etc.) alongside our custom tokens, which quietly defeats this whole system. Two safeguards:

1. **Default palette is disabled.** `src/index.css` includes `--color-*: initial;` at the top of the `@theme` block, which removes Tailwind's built-in colors entirely. If you type `bg-blue-500`, it will generate **no CSS** — the element renders unstyled. That's intentional: it's a visible bug in dev/preview, not a subtle wrong-blue in production.
2. **Pre-commit / CI check.** `npm run lint:colors` scans `src/pages` and `src/components` for raw hex codes and arbitrary values (`bg-[...]`, `text-[...]`) and fails the build if any are found. Run it locally before opening a PR.

If either of these stops you from doing something you think is legitimate, that's a signal to add a proper token (Section 5) — not to bypass the check.

---

## 7. Quick PR review checklist

Before approving a PR that touches UI:

- [ ] No hex codes (`#...`) anywhere in `className` or inline `style`.
- [ ] No Tailwind default colors (`blue-`, `red-`, `slate-`, `emerald-`, etc.).
- [ ] No arbitrary values (`bg-[...]`, `text-[...]`, `border-[...]`) for color.
- [ ] Any new color need is added to `src/index.css` as a token, not inlined.
- [ ] `npm run lint:colors` passes.

---

*Questions about this system, or need a new token added? Ping whoever owns `src/index.css` before introducing a new color — that file is the single source of truth for the whole product's palette.*