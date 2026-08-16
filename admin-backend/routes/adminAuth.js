import { Router } from "express";
import bcrypt from "bcryptjs";
import { readLocal } from "../utils/localStore.js";
import { signAdminToken, requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

function publicAdmin(a) {
  const { passwordHash, ...rest } = a;
  return rest;
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

  const admins = readLocal("admins.json");
  const admin = admins.find((a) => a.email.toLowerCase() === String(email).toLowerCase());
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.json({ token: signAdminToken(admin), admin: publicAdmin(admin) });
});

router.get("/me", requireAdmin, (req, res) => {
  const admins = readLocal("admins.json");
  const admin = admins.find((a) => a.id === req.adminId);
  if (!admin) return res.status(404).json({ error: "Admin not found." });
  res.json({ admin: publicAdmin(admin) });
});

export default router;
