import bcrypt from "bcryptjs";
import crypto from "crypto";
import { readLocal, writeLocal } from "./localStore.js";

// If no admin account exists yet, create one from env vars so the admin
// panel is usable on first run without a manual setup step.
export async function seedDefaultAdminIfNeeded() {
  const admins = readLocal("admins.json");
  if (admins.length > 0) return;

  const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@civilalliancetravels.com";
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@12345";

  admins.push({
    id: crypto.randomUUID(),
    name: "Site Admin",
    email,
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  });
  writeLocal("admins.json", admins);

  console.log("─".repeat(60));
  console.log("No admin account found — seeded a default one:");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);
  console.log("Change this (or delete admin-backend/data/admins.json and");
  console.log("set DEFAULT_ADMIN_EMAIL/DEFAULT_ADMIN_PASSWORD) before real use.");
  console.log("─".repeat(60));
}
