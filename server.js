import "dotenv/config";
import express from "express";
import cors from "cors";

// Deployment-only composition: runs the customer backend and admin backend
// as one Express app / one process, so admin-backend's sharedStore.js (which
// reads/writes ../backend/data/*.json via a relative filesystem path) actually
// works — that only holds true when both run on the same machine, which two
// separate hosted services never share. `backend/` and `admin-backend/` stay
// independent folders/codebases for local dev (`npm run dev` in each still
// works); this file just imports their existing route modules unchanged.

import authRoutes from "./backend/routes/auth.js";
import bookingsRoutes from "./backend/routes/bookings.js";
import inquiriesRoutes from "./backend/routes/inquiries.js";
import packagesRoutes from "./backend/routes/packages.js";
import offersRoutes from "./backend/routes/offers.js";

import { seedDefaultAdminIfNeeded } from "./admin-backend/utils/seedAdmin.js";
import adminAuthRoutes from "./admin-backend/routes/adminAuth.js";
import adminBookingsRoutes from "./admin-backend/routes/bookings.js";
import adminInquiriesRoutes from "./admin-backend/routes/inquiries.js";
import adminPackagesRoutes from "./admin-backend/routes/packages.js";
import adminOffersRoutes from "./admin-backend/routes/offers.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Both the customer frontend and admin frontend origins are allowed here —
// each route group still enforces its own auth (JWT_SECRET vs
// ADMIN_JWT_SECRET), so sharing one CORS allowlist doesn't blur that boundary.
const ALLOWED_ORIGINS = [process.env.FRONTEND_ORIGIN, process.env.ADMIN_FRONTEND_ORIGIN]
  .filter(Boolean)
  .flatMap((o) => o.split(","))
  .map((o) => o.trim());

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "civil-alliance-combined" }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/offers", offersRoutes);

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/bookings", adminBookingsRoutes);
app.use("/api/admin/inquiries", adminInquiriesRoutes);
app.use("/api/admin/packages", adminPackagesRoutes);
app.use("/api/admin/offers", adminOffersRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

await seedDefaultAdminIfNeeded();

app.listen(PORT, () => {
  console.log(`Civil Alliance combined backend listening on http://localhost:${PORT}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(", ") || "(none set)"}`);
});
