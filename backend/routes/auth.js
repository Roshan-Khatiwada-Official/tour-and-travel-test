import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { readCollection, writeCollection } from "../utils/jsonStore.js";
import { signUserToken, requireAuth } from "../middleware/auth.js";

const router = Router();

function publicUser(u) {
  const { passwordHash, ...rest } = u;
  return rest;
}

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required." });
  }
  const users = readCollection("users.json");
  if (users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    phone: phone || "",
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeCollection("users.json", users);

  const token = signUserToken(user);
  res.status(201).json({ token, user: publicUser(user) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

  const users = readCollection("users.json");
  const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signUserToken(user);
  res.json({ token, user: publicUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  const users = readCollection("users.json");
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ user: publicUser(user) });
});

router.patch("/me", requireAuth, (req, res) => {
  const { name, phone } = req.body || {};
  const users = readCollection("users.json");
  const user = users.find((u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: "User not found." });

  if (typeof name === "string") {
    if (!name.trim()) return res.status(400).json({ error: "Name can't be empty." });
    user.name = name.trim();
  }
  if (typeof phone === "string") user.phone = phone.trim();

  writeCollection("users.json", users);
  res.json({ user: publicUser(user) });
});

export default router;
