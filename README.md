# School Management System — Frontend

Enterprise, multi-tenant School Management System (SMS) frontend for EduSphere Company Ltd. One platform-level Super Admin manages many schools;
each school has its own School Admin, Teachers, Staff, Students, and
Parents. Platform-level and school-level responsibilities are always kept
separate — a School Admin can never act outside their own school.

> **Status:** Super Admin workflows are implemented against mock/demo
> data — no backend exists yet. Every request shape in "API Contract"
> below is a **frontend assumption**, not a confirmed contract. Built so
> far: Authentication (login/register/OTP/password reset), Schools
> (CRUD, lifecycle, School Admin assignment, subscription plan
> assignment), School Admins (CRUD, permission overrides, activity
> history), Subscription Plans (CRUD), and School Subscriptions
> (list/view/create/change). Student/Teacher/Parent/academic/finance
> modules are not started.

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
cp .env   # then set VITE_API_BASE_URL
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

## API Contract — assumed endpoints (for backend)

**None of this is a confirmed contract.** Every endpoint below is a
frontend assumption baked into a feature's `services/<feature>.service.js`
file for the purpose of driving mock data and getting the UI's shape
right — the actual URL, verb, request body, response body, status codes,
and error format are all backend's to decide. Where this doc and the
real API disagree, only the service file needs to change; nothing in a
page, hook, or component talks to Axios directly (see "API strategy"
above), so the blast radius of a contract change is always one file per
feature.

**Base URL:** `VITE_API_BASE_URL` (see "Environment variables"), default
`/api`. Every path below is relative to that.

**Auth:** `POST /auth/login` and `POST /auth/register` are assumed to
return `{ user, token }`. **The frontend does not yet attach that token
to subsequent requests** — `services/apiClient.js` has no request
interceptor and no 401/refresh handling. That wiring is explicitly
deferred to a future Authentication milestone; today every other
endpoint below is called with no `Authorization` header at all. Backend
should not expect a bearer token on the endpoints below until that lands.

**Errors:** `apiClient`'s response interceptor normalizes any non-2xx
response into `{ status, message, fieldErrors }` before it reaches the
UI (`status`: 0 on network failure, else `error.response.status`;
`message`: `data?.message`, falls back to a generic string;
`fieldErrors`: `data?.errors`, or `null`). Returning `{ message: string,
errors?: Record<string, string> }` on error responses is the one thing
every write flow in this app already expects and displays.

**Roles/permissions:** Two roles exist today, `super_admin` and
`school_admin` (see `src/constants/role.js`); everything documented here
is a Super Admin workflow. The permission string named per endpoint
below (see `src/constants/permission.js`) is what the _frontend_ route
is gated behind — it does not imply the backend already enforces
anything with that name; that enforcement is backend's own to build.

### Quick reference

| Method | Path                                               | Purpose                                         | Permission (frontend gate) |
| ------ | -------------------------------------------------- | ----------------------------------------------- | -------------------------- |
| POST   | `/auth/login`                                      | Sign in                                         | —                          |
| POST   | `/auth/register`                                   | Register                                        | —                          |
| POST   | `/auth/forgot-password`                            | Request password reset                          | —                          |
| POST   | `/auth/reset-password`                             | Complete password reset                         | —                          |
| POST   | `/auth/verify-otp`                                 | Verify OTP                                      | —                          |
| POST   | `/auth/verify-otp/resend`                          | Resend OTP                                      | —                          |
| POST   | `/auth/logout`                                     | Sign out                                        | —                          |
| GET    | `/auth/me`                                         | Current session                                 | —                          |
| POST   | `/schools`                                         | Create school (+ its School Admin)              | `schools.create`           |
| PATCH  | `/schools/:schoolId`                               | Update school profile                           | `schools.edit`             |
| POST   | `/schools/:schoolId/activate`                      | Activate school                                 | `schools.activate`         |
| POST   | `/schools/:schoolId/deactivate`                    | Deactivate school                               | `schools.deactivate`       |
| POST   | `/schools/:schoolId/suspend`                       | Suspend school                                  | `schools.suspend`          |
| POST   | `/schools/:schoolId/school-admin`                  | Assign an existing School Admin                 | `school_admins.manage`     |
| DELETE | `/schools/:schoolId/school-admin`                  | Remove the School Admin assignment              | `school_admins.manage`     |
| POST   | `/schools/:schoolId/subscription-plan`             | Assign/change the school's plan                 | `subscriptions.manage`     |
| POST   | `/school-admins`                                   | Create a School Admin account                   | `school_admins.manage`     |
| PATCH  | `/school-admins/:adminId`                          | Update profile/contact                          | `school_admins.manage`     |
| PUT    | `/school-admins/:adminId/permissions`              | Set permission overrides                        | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/reset-password`           | Reset password                                  | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/activate`                 | Activate account                                | `school_admins.manage`     |
| POST   | `/school-admins/:adminId/deactivate`               | Deactivate account                              | `school_admins.manage`     |
| GET    | `/school-admins/:adminId/activity`                 | Activity/audit history                          | `audit_logs.view`          |
| GET    | `/subscriptions/plans`                             | List subscription plans                         | `subscriptions.view`       |
| GET    | `/subscriptions/plans/:planId`                     | Get one plan                                    | `subscriptions.view`       |
| POST   | `/subscriptions/plans`                             | Create plan                                     | `subscriptions.manage`     |
| PATCH  | `/subscriptions/plans/:planId`                     | Update plan                                     | `subscriptions.manage`     |
| DELETE | `/subscriptions/plans/:planId`                     | Delete plan                                     | `subscriptions.manage`     |
| GET    | `/subscriptions/schools`                           | List school subscription records                | `subscriptions.view`       |
| GET    | `/subscriptions/schools/:schoolId`                 | Get one school's subscription record            | `subscriptions.view`       |
| POST   | `/subscriptions/schools/:schoolId`                 | Create a school's subscription record           | `subscriptions.manage`     |
| PATCH  | `/subscriptions/schools/:schoolId/:subscriptionId` | Change plan/billing on an existing subscription | `subscriptions.manage`     |

### Auth (`src/features/auth/services/auth.service.js`)

- **`POST /auth/login`** — body `{ email, password }` → assumed response
  `{ user, token }`.
- **`POST /auth/register`** — body is whatever the registration form
  collects → assumed response `{ user }`.
- **`POST /auth/forgot-password`** — body `{ email }`; response not
  relied on.
- **`POST /auth/reset-password`** — body `{ token, password }`; response
  not relied on.
- **`POST /auth/verify-otp`** — body `{ email, otp }`; response not
  relied on.
- **`POST /auth/verify-otp/resend`** — body `{ email }`; response not
  relied on.
- **`POST /auth/logout`** — no body; response passed through as-is.
- **`GET /auth/me`** — response passed through as-is (expected to be the
  current user).

`user` is expected to at least carry a `role` matching one of
`src/constants/role.js`'s values — that's the one field the frontend
actually reads (`app/store/authStore.js`) to decide which shell/routes a
signed-in user sees.

### Schools (`src/features/schools/services/schools.service.js`)

- **`POST /schools`** — creates a school **and** its first School Admin
  account together. Body:

  ```json
  {
    "name": "string, 2-100 chars",
    "code": "string, 3-20 chars, ^[A-Z0-9-]+$, e.g. SCH-0001",
    "schoolType": "string",
    "schoolCategory": "string",
    "email": "string, email",
    "phone": "string, matches ^[+\\d][\\d\\s-]{11}$",
    "country": "string",
    "state": "string",
    "city": "string",
    "address": "string, 10+ chars",
    "adminFirstName": "string",
    "adminLastName": "string",
    "adminEmail": "string, email",
    "adminPhone": "string, same phone pattern",
    "password": "string, 8+ chars — the new School Admin's password"
  }
  ```

  A `logo` file may be selected in the UI but is **never sent** — no
  multipart upload contract exists yet, so it stays a local-only preview
  until a real file-upload endpoint is confirmed.

- **`PATCH /schools/:schoolId`** — same field set as create, minus
  `adminFirstName`/`adminLastName`/`adminEmail`/`adminPhone`/`password`
  (the School Admin account is edited through its own endpoints, not
  here) and minus `logo`. Status, subscription, and usage counts are
  never sent — they aren't editable from this form.
- **`POST /schools/:schoolId/activate`** / **`.../deactivate`** — no
  body; the action is the endpoint.
- **`POST /schools/:schoolId/suspend`** — no body. Deliberately a third,
  distinct state from activate/deactivate, not folded into them.
- **`POST /schools/:schoolId/school-admin`** — body `{ schoolAdminId }`.
  Associates an **existing** School Admin account with this school (does
  not create one — see the School Admins endpoints for that). If that
  admin is already assigned elsewhere, the frontend's understanding is
  that completing this call moves them here.
- **`DELETE /schools/:schoolId/school-admin`** — no body. Removes the
  relationship only — must **not** delete the School Admin account,
  touch its password/status/permissions, or affect other schools; the
  account should remain assignable elsewhere afterward.
- **`POST /schools/:schoolId/subscription-plan`** — body `{ planId }`.
  Sets which existing plan this school is on. This is a **plan
  selection**, not a subscription — see the distinction under "School
  Subscriptions" below. It must not create a subscription, process a
  payment, or set a renewal date.

### School Admins (`src/features/school-admins/services/schoolAdmins.service.js`)

- **`POST /school-admins`** — body `{ firstName, lastName, email, phone,
password }` (the client-side `confirmPassword` field is stripped
  before sending — never transmitted).
- **`PATCH /school-admins/:adminId`** — body is a subset of `{
firstName, lastName, email, phone }`, only the keys actually present.
  Password, school assignment, status, and permissions are never sent
  through this endpoint — each has its own below.
- **`PUT /school-admins/:adminId/permissions`** — body:

  ```json
  {
    "grantedPermissions": ["string", "..."],
    "deniedPermissions": ["string", "..."]
  }
  ```

  Both arrays hold values from the school-scoped permission catalog
  (`SCHOOL_PERMISSIONS` in `src/constants/permission.js` — the full list
  is below). These are **explicit overrides layered on top of the
  `school_admin` role's baseline permissions**, not a replacement
  permission list and not a change to the role itself. Effective
  permission = `(role permissions ∪ grantedPermissions) − deniedPermissions`
  — an explicit deny always wins over an explicit grant, which always
  wins over the role baseline. The frontend never sends a permission
  string outside `SCHOOL_PERMISSIONS`, and never lets the same
  permission sit in both arrays — backend should still validate this
  server-side rather than trust the client.

- **`POST /school-admins/:adminId/reset-password`** — body `{ password
}`. Sets a new password directly (no email-a-reset-link flow exists
  for this admin-initiated action).
- **`POST /school-admins/:adminId/activate`** / **`.../deactivate`** —
  no body.
- **`GET /school-admins/:adminId/activity`** — assumed response: an
  array of activity/audit entries for this one admin (not a
  platform-wide audit log — that's a separate, not-yet-built feature).
  Suggested entry shape based on what the frontend renders: `{ id,
action/type, description, timestamp, actor, actorRole, result }`.
  **Never include password hashes, tokens, or secrets** in these
  records — the UI only ever displays that an action happened (e.g.
  "Password reset"), never the value involved.

Full `SCHOOL_PERMISSIONS` catalog a School Admin's overrides may
reference (`src/constants/permission.js`): `users.view`, `users.create`,
`users.edit`, `users.deactivate`, `users.reset_password`,
`students.view`, `students.create`, `students.edit`, `students.delete`,
`teachers.manage`, `classes.manage`, `parents.manage`, `results.view`,
`results.enter`, `results.edit`, `results.publish`, `fees.view`,
`fees.manage`, `fees.collect`, `fees.refund`, `attendance.manage`,
`admissions.manage`, `library.manage`, `school_settings.manage`.

### Subscription Plans (`src/features/subscriptions/services/subscriptions.service.js`)

Catalog-level plan definitions — e.g. "Basic", "Professional",
"Enterprise" — completely separate from any one school's relationship to
a plan (see below).

- **`GET /subscriptions/plans`** — assumed response: an array of plan
  objects.
- **`GET /subscriptions/plans/:planId`** — assumed response: one plan
  object, or a 404 if not found.
- **`POST /subscriptions/plans`** / **`PATCH /subscriptions/plans/:planId`**
  — body:

  ```json
  {
    "name": "string, 2-50 chars, must be unique",
    "description": "string, 1-300 chars",
    "monthlyPrice": "number > 0",
    "yearlyPrice": "number > 0",
    "currency": "one of: ₦",
    "studentLimit": "positive integer, or null for unlimited",
    "teacherLimit": "positive integer, or null for unlimited",
    "campusLimit": "positive integer, or null for unlimited",
    "features": {
      "parentPortal": "boolean",
      "advancedReports": "boolean",
      "multipleCampuses": "boolean",
      "advancedAnalytics": "boolean",
      "customFeatures": "boolean"
    },
    "status": "active | inactive"
  }
  ```

  `id` is never part of the body on either verb — the frontend expects
  the backend to assign it on create and never lets it be edited
  afterward. **Name uniqueness is checked client-side today only as a
  convenience; the backend must be the authoritative source of truth**
  for it (a race between two admins can only be caught server-side).
  `null` is the sole "no limit" representation the frontend ever sends —
  never a sentinel like `-1`.

- **`DELETE /subscriptions/plans/:planId`** — no body. This is a request
  to remove the plan from the catalog; the frontend does **not** assume
  the backend cascades this into deleting/migrating any school's
  subscription or assignment that references it — those are separate
  concerns the backend owns.

### School Subscriptions (`src/features/subscriptions/services/subscriptions.service.js`)

**Deliberately a third, separate concept** from both the plan catalog
above and a school's simple "which plan is selected"
(`POST /schools/:schoolId/subscription-plan`, above). A School
Subscription is an actual lifecycle record — a school can have an
assigned plan with **no** subscription record, and that must never be
read as proof of an active, paid subscription.

- **`GET /subscriptions/schools`** — assumed response: an array of
  subscription records.
- **`GET /subscriptions/schools/:schoolId`** — assumed response: one
  record for that school, or a 404/empty if the school has never
  subscribed. A school has at most one subscription record in the
  frontend's current model.
- **`POST /subscriptions/schools/:schoolId`** — creates the record. Body:

  ```json
  {
    "planId": "string, an existing plan id",
    "billingCycle": "monthly | yearly",
    "amount": "number — the selected plan's price at that billing cycle",
    "currency": "string",
    "startDate": "ISO date string"
  }
  ```

  `amount` is derived client-side from the chosen plan + billing cycle
  and is never independently editable in the UI, but the backend should
  still treat it (and everything else here) as advisory, not
  authoritative — recompute/validate against the plan's real price
  server-side. The frontend sends **no** `id`, `status` beyond what's
  implied by creation, invoice id, transaction id, or payment-provider
  id — **this call does not process a payment, generate an invoice, or
  confirm billing**; it only establishes the subscription record.
  `trialStartDate`/`trialEndDate` are always `null` on creation — there
  is no trial-selection UI yet.

- **`PATCH /subscriptions/schools/:schoolId/:subscriptionId`** — changes
  the plan/billing selection on a school's **existing** subscription
  record. Body:

  ```json
  {
    "planId": "string, an existing plan id",
    "billingCycle": "monthly | yearly",
    "amount": "number — the selected plan's price at that billing cycle",
    "currency": "string"
  }
  ```

  `subscriptionId` is only ever in the URL, never in the body. The
  frontend sends **no** `id`, `schoolId`, `status`, `startDate`,
  `endDate`, `renewalDate`, or trial fields here — this call changes the
  plan/billing selection only. Status, dates, and trial fields are all
  preserved from the existing record. Like the create endpoint above,
  this does not process a payment, generate an invoice, or change the
  subscription's status — it is not cancellation, renewal, or an
  upgrade/downgrade workflow; those aren't built yet (see "Not yet built
  on the frontend at all" below).

Suggested response/record shape based on what the frontend reads:

```json
{
  "id": "string",
  "schoolId": "string",
  "planId": "string",
  "status": "active | trial | expired | cancelled",
  "billingCycle": "monthly | yearly",
  "amount": "number",
  "currency": "string",
  "startDate": "ISO date string",
  "endDate": "ISO date string | null",
  "renewalDate": "ISO date string | null",
  "trialStartDate": "ISO date string | null",
  "trialEndDate": "ISO date string | null"
}
```

Not yet built on the frontend at all, so no contract is assumed for
them: changing/cancelling a subscription, trials, renewals,
upgrades/downgrades, billing calculations, invoices, payment
transactions, Paystack or any other payment provider, and payment
webhooks.

### Known limitations while there's no backend

Every list/detail the UI shows today (schools, school admins,
subscription plans, school subscriptions) reads from static, frozen
mock arrays in each feature's `data/` folder, with a thin session-only
overlay (a plain in-memory store, not persisted) representing anything
created/edited/deleted during the current browser tab — none of it
survives a page reload, and none of it is a real cache of a real API. As
each resource's real endpoints come online, the corresponding
`services/<feature>.service.js` file is where the swap happens; the
`useX()`/`useX(id)` hooks and every page/component above them are
already written against the shape this document describes, so they
should need little to no change.

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
