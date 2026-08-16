import { Router } from "express";
import crypto from "crypto";
import { readShared, writeShared } from "../utils/sharedStore.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();
router.use(requireAdmin);

function joined() {
  const offers = readShared("offers.json");
  const packages = readShared("packages.json");
  return offers.map((o) => {
    const pkg = packages.find((p) => p.id === o.packageId);
    const discountedPrice = pkg ? Math.round((pkg.price * (100 - o.discountPercent)) / 100) : null;
    return { ...o, pkg: pkg || null, discountedPrice };
  });
}

router.get("/", (_req, res) => {
  res.json({ offers: joined() });
});

router.post("/", (req, res) => {
  const { packageId, discountPercent, validUntil } = req.body || {};
  if (!packageId || !discountPercent || !validUntil) {
    return res.status(400).json({ error: "packageId, discountPercent and validUntil are required." });
  }
  const packages = readShared("packages.json");
  if (!packages.some((p) => p.id === packageId)) {
    return res.status(404).json({ error: "No package with that id." });
  }

  const offers = readShared("offers.json");
  const offer = { id: crypto.randomUUID(), packageId, discountPercent: Number(discountPercent), validUntil };
  offers.push(offer);
  writeShared("offers.json", offers);
  res.status(201).json({ offer });
});

router.put("/:id", (req, res) => {
  const offers = readShared("offers.json");
  const index = offers.findIndex((o) => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Offer not found." });

  offers[index] = { ...offers[index], ...req.body, id: offers[index].id };
  writeShared("offers.json", offers);
  res.json({ offer: offers[index] });
});

router.delete("/:id", (req, res) => {
  const offers = readShared("offers.json");
  const next = offers.filter((o) => o.id !== req.params.id);
  if (next.length === offers.length) return res.status(404).json({ error: "Offer not found." });

  writeShared("offers.json", next);
  res.status(204).end();
});

export default router;
