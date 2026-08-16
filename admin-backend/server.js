import "dotenv/config";
import express from "express";
import cors from "cors";

import { seedDefaultAdminIfNeeded } from "./utils/seedAdmin.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import bookingsRoutes from "./routes/bookings.js";
import inquiriesRoutes from "./routes/inquiries.js";
import packagesRoutes from "./routes/packages.js";
import offersRoutes from "./routes/offers.js";

const app = express();
const PORT = process.env.PORT || 4001;
const ADMIN_FRONTEND_ORIGIN = process.env.ADMIN_FRONTEND_ORIGIN || "http://localhost:5175";

app.use(cors({ origin: ADMIN_FRONTEND_ORIGIN.split(",").map((o) => o.trim()) }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "civil-alliance-admin-backend" }));

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/bookings", bookingsRoutes);
app.use("/api/admin/inquiries", inquiriesRoutes);
app.use("/api/admin/packages", packagesRoutes);
app.use("/api/admin/offers", offersRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

await seedDefaultAdminIfNeeded();

app.listen(PORT, () => {
  console.log(`Civil Alliance admin backend listening on http://localhost:${PORT}`);
});
