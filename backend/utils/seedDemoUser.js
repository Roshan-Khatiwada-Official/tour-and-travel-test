import bcrypt from "bcryptjs";
import crypto from "crypto";
import { readCollection, writeCollection } from "./jsonStore.js";

// Mirrors admin-backend's seedDefaultAdminIfNeeded — on hosts with an
// ephemeral filesystem (e.g. Render's free tier resets data/*.json on every
// cold start/redeploy), a manually-created demo account silently vanishes
// between client visits. Re-creating it from env vars on every boot keeps a
// shared demo login working no matter how many times the instance restarts.
// Opt-in only: does nothing unless DEMO_USER_EMAIL/DEMO_USER_PASSWORD are set.
export async function seedDemoUserIfNeeded() {
  const email = process.env.DEMO_USER_EMAIL;
  const password = process.env.DEMO_USER_PASSWORD;
  if (!email || !password) return;

  const users = readCollection("users.json");
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return;

  users.push({
    id: crypto.randomUUID(),
    name: process.env.DEMO_USER_NAME || "Demo User",
    email,
    phone: process.env.DEMO_USER_PHONE || "",
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  });
  writeCollection("users.json", users);
  console.log(`Seeded demo user (survives restarts): ${email}`);
}
