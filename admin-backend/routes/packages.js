import { Router } from "express";
import { readShared, writeShared } from "../utils/sharedStore.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();
router.use(requireAdmin);

export const CATEGORIES = ["Trekking", "Cultural", "Pilgrimage", "Adventure", "Wildlife"];

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

router.get("/", (_req, res) => {
  res.json({ packages: readShared("packages.json") });
});

router.post("/", (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.price || !body.days) {
    return res.status(400).json({ error: "title, price and days are required." });
  }
  if (body.category && !CATEGORIES.includes(body.category)) {
    return res.status(400).json({ error: `category must be one of: ${CATEGORIES.join(", ")}` });
  }
  const packages = readShared("packages.json");
  const id = body.id || slugify(body.title);
  if (packages.some((p) => p.id === id)) {
    return res.status(409).json({ error: `A package with id "${id}" already exists.` });
  }

  const pkg = {
    id,
    title: body.title,
    category: body.category || CATEGORIES[0],
    loc: body.loc || "",
    days: Number(body.days),
    price: Number(body.price),
    badge: body.badge || "",
    badgeClass: body.badgeClass || "badge-cultural",
    tags: Array.isArray(body.tags) ? body.tags : [],
    sky: body.sky || "#3A9BDC",
    ground: body.ground || "#0B2545",
    rating: Number(body.rating) || 5,
    photo: body.photo || null,
    summary: body.summary || "",
    itinerary: Array.isArray(body.itinerary) ? body.itinerary : [],
    inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
    exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
    priceBreakdown: Array.isArray(body.priceBreakdown) ? body.priceBreakdown : [{ label: "Package cost (per person)", amount: Number(body.price) }],
  };
  packages.push(pkg);
  writeShared("packages.json", packages);
  res.status(201).json({ package: pkg });
});

router.put("/:id", (req, res) => {
  if (req.body?.category && !CATEGORIES.includes(req.body.category)) {
    return res.status(400).json({ error: `category must be one of: ${CATEGORIES.join(", ")}` });
  }
  const packages = readShared("packages.json");
  const index = packages.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Package not found." });

  packages[index] = { ...packages[index], ...req.body, id: packages[index].id };
  writeShared("packages.json", packages);
  res.json({ package: packages[index] });
});

router.delete("/:id", (req, res) => {
  const packages = readShared("packages.json");
  const next = packages.filter((p) => p.id !== req.params.id);
  if (next.length === packages.length) return res.status(404).json({ error: "Package not found." });

  writeShared("packages.json", next);

  // Keep offers.json from pointing at a package that no longer exists.
  const offers = readShared("offers.json").filter((o) => o.packageId !== req.params.id);
  writeShared("offers.json", offers);

  res.status(204).end();
});

export default router;
