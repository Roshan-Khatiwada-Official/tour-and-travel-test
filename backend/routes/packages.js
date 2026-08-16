import { Router } from "express";
import { readCollection } from "../utils/jsonStore.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ packages: readCollection("packages.json") });
});

router.get("/:id", (req, res) => {
  const pkg = readCollection("packages.json").find((p) => p.id === req.params.id);
  if (!pkg) return res.status(404).json({ error: "Package not found." });
  res.json({ package: pkg });
});

export default router;
