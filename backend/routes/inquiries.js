import { Router } from "express";
import crypto from "crypto";
import { readCollection, writeCollection } from "../utils/jsonStore.js";
import { requireAuth, attachUserIfPresent } from "../middleware/auth.js";

const router = Router();

router.post("/", attachUserIfPresent, (req, res) => {
  const { name, email, phone, whatsapp, destination, travelDate, travelers, services, message, source } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const inquiries = readCollection("inquiries.json");
  const inquiry = {
    id: crypto.randomUUID(),
    userId: req.userId || null,
    source: source || "inquiry",
    name,
    email,
    phone: phone || "",
    whatsapp: whatsapp || "",
    destination: destination || "",
    travelDate: travelDate || "",
    travelers: travelers ? Number(travelers) : null,
    services: Array.isArray(services) ? services : [],
    message: message || "",
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.push(inquiry);
  writeCollection("inquiries.json", inquiries);

  res.status(201).json({ inquiry });
});

router.get("/mine", requireAuth, (req, res) => {
  const inquiries = readCollection("inquiries.json").filter((i) => i.userId === req.userId);
  res.json({ inquiries });
});

export default router;
