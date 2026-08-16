# Civil Alliance Tours & Travels — Full Project

Four independent apps, each in its own folder with its own `package.json`.
There is no shared build step — start each one separately (four terminals,
or four `npm run dev` in the background).

```
civil-alliance/
  frontend/         Customer-facing website (React + Vite). Port 5173.
  backend/          Customer API (Express + JSON files). Port 4000.
  admin-frontend/   Admin panel UI (React + Vite). Port 5175.
  admin-backend/    Admin API (Express + JSON files). Port 4001.
```

## Data storage

There is no real database. Both backends persist to flat JSON files instead
of a database engine:

- `backend/data/*.json` — `users.json`, `bookings.json`, `inquiries.json`,
  `packages.json`, `offers.json`. This is the one canonical copy of this data.
- `admin-backend/data/admins.json` — admin accounts only, kept separate from
  customer users on purpose.

`admin-backend` does **not** keep its own copy of bookings/inquiries/packages/
offers — it reads and writes `backend/data/*.json` directly (see
`admin-backend/utils/sharedStore.js`), so the admin panel always reflects what
customers actually submitted on the live site. This means `backend` and
`admin-backend` should generally be run from the same checked-out copy of the
repo (same relative folder layout) — don't split them into separate deploys
without also giving admin-backend a way to reach that data.

This setup is fine for one dev instance. It is **not** safe for concurrent
writers (no locking) — swap `utils/jsonStore.js` (and the equivalent in
admin-backend) for a real database before this goes to production traffic.

## First-time setup

Each folder needs its own `npm install` and its own `.env` (copy from the
`.env.example` in that folder):

```bash
cd backend          && npm install && cp .env.example .env
cd ../admin-backend  && npm install && cp .env.example .env
cd ../frontend       && npm install && cp .env.example .env
cd ../admin-frontend && npm install && cp .env.example .env
```

## Running everything

Start all four (order doesn't matter, but the frontends expect their backend
to be reachable once you start using login/booking/admin features):

```bash
cd backend && npm run dev          # http://localhost:4000
cd admin-backend && npm run dev    # http://localhost:4001
cd frontend && npm run dev         # http://localhost:5173
cd admin-frontend && npm run dev   # http://localhost:5175
```

### Admin login

`admin-backend` auto-seeds one admin account the first time it runs (only if
`admin-backend/data/admins.json` is empty) and prints the generated
credentials to the console. Override them up front via
`DEFAULT_ADMIN_EMAIL` / `DEFAULT_ADMIN_PASSWORD` in `admin-backend/.env`, or
just read them off the console on first boot. Change the password (or the
seed) before this is ever exposed publicly.

### Customer accounts

Anyone can sign up from `frontend` (`/signup`). Logging in unlocks `/dashboard`,
which shows the bookings and inquiries tied to that account. Booking/enquiring
as a guest (not logged in) still works and still lands in the admin panel —
it just won't show up under any customer's dashboard.

## What's real vs. mocked

- **Auth** (customer + admin): real — JWT-based, passwords hashed with bcrypt,
  stored in the JSON files above.
- **Bookings / Inquiries**: real — submitted from the site, persisted to JSON,
  manageable (status updates) from the admin panel.
- **Packages / Offers catalog**: real — the site reads it live from
  `backend`, and the admin panel can add/edit/delete entries.
- **Payments**: mocked. `backend` never talks to a real payment processor.
  `frontend/src/lib/payments.js` is the single place a real eSewa / Khalti /
  Fonepay / card integration should be wired in later — see the comment at
  the top of that file for exactly what needs to change and why it needs a
  backend to hold secret keys.

## Project structure inside each app

```
frontend/
  src/components/   Navbar, Footer, forms, cards, etc.
  src/pages/        One file per route (Home, Packages, Booking, Dashboard, ...)
  src/context/      AuthContext (customer auth), CatalogContext (packages/offers)
  src/data/         Static content that isn't backend-driven (services list, FAQs, blog posts)
  src/lib/          api.js (fetch wrapper), payments.js (mock payment gateway)

backend/
  server.js         Express app entrypoint
  routes/           auth, bookings, inquiries, packages, offers
  middleware/       JWT auth (required + optional)
  utils/jsonStore.js  Generic JSON read/write helpers
  data/             The JSON "database"

admin-frontend/
  src/pages/        Login, Overview, Bookings, Inquiries, Packages, Offers
  src/components/   AdminLayout (sidebar/topbar), ProtectedRoute
  src/context/      AdminAuthContext

admin-backend/
  server.js         Express app entrypoint
  routes/           adminAuth, bookings, inquiries, packages, offers (all requireAdmin)
  middleware/adminAuth.js  Admin JWT (separate secret from the customer backend)
  utils/localStore.js      admin-backend's own data (admins.json)
  utils/sharedStore.js     Reads/writes backend/data/*.json directly
  data/admins.json  Seeded automatically on first run
```
