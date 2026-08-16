import { Router } from "express";
import { readShared, writeShared } from "../utils/sharedStore.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();
router.use(requireAdmin);

const VALID_STATUSES = ["new", "responded", "closed"];

router.get("/", (_req, res) => {
  const inquiries = readShared("inquiries.json").sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json({ inquiries });
});

router.patch("/:id", (req, res) => {
  const { status } = req.body || {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
  }
  const inquiries = readShared("inquiries.json");
  const inquiry = inquiries.find((i) => i.id === req.params.id);
  if (!inquiry) return res.status(404).json({ error: "Inquiry not found." });

  inquiry.status = status;
  writeShared("inquiries.json", inquiries);
  res.json({ inquiry });
});

export default router;
