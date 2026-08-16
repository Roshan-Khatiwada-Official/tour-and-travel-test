import { Router } from "express";
import { readCollection } from "../utils/jsonStore.js";

const router = Router();

router.get("/", (_req, res) => {
  const offers = readCollection("offers.json");
  const packages = readCollection("packages.json");
  const joined = offers
    .map((o) => {
      const pkg = packages.find((p) => p.id === o.packageId);
      if (!pkg) return null;
      const discountedPrice = Math.round((pkg.price * (100 - o.discountPercent)) / 100);
      return { ...o, pkg, discountedPrice };
    })
    .filter(Boolean);
  res.json({ offers: joined });
});

export default router;
