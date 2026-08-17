import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import bookingsRoutes from "./routes/bookings.js";
import inquiriesRoutes from "./routes/inquiries.js";
import packagesRoutes from "./routes/packages.js";
import offersRoutes from "./routes/offers.js";
import { seedDemoUserIfNeeded } from "./utils/seedDemoUser.js";

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_ORIGIN.split(",").map((o) => o.trim()) }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "civil-alliance-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/offers", offersRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

await seedDemoUserIfNeeded();

app.listen(PORT, () => {
  console.log(`Civil Alliance backend listening on http://localhost:${PORT}`);
});
