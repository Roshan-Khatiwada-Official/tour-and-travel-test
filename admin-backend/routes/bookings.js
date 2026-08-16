import { Router } from "express";
import { readShared, writeShared } from "../utils/sharedStore.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();
router.use(requireAdmin);

const VALID_STATUSES = ["pending_confirmation", "confirmed", "paid", "cancelled"];

router.get("/", (_req, res) => {
  const bookings = readShared("bookings.json").sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json({ bookings });
});

router.patch("/:id", (req, res) => {
  const { status } = req.body || {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
  }
  const bookings = readShared("bookings.json");
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found." });

  booking.status = status;
  writeShared("bookings.json", bookings);
  res.json({ booking });
});

export default router;
