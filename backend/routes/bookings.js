import { Router } from "express";
import crypto from "crypto";
import { readCollection, writeCollection } from "../utils/jsonStore.js";
import { requireAuth, attachUserIfPresent } from "../middleware/auth.js";

const router = Router();

function generateBookingRef() {
  return `CA-${Date.now().toString(36).toUpperCase()}`;
}

router.post("/", attachUserIfPresent, (req, res) => {
  const { fullName, email, phone, whatsapp, travelers, departureDate, packageId, message, paymentMethod } = req.body || {};
  if (!fullName || !email || !phone || !packageId || !departureDate) {
    return res.status(400).json({ error: "fullName, email, phone, packageId and departureDate are required." });
  }

  const packages = readCollection("packages.json");
  const pkg = packages.find((p) => p.id === packageId);
  if (!pkg) return res.status(404).json({ error: "Package not found." });

  const bookings = readCollection("bookings.json");
  const booking = {
    id: crypto.randomUUID(),
    bookingRef: generateBookingRef(),
    userId: req.userId || null,
    fullName,
    email,
    phone,
    whatsapp: whatsapp || "",
    travelers: Number(travelers) || 1,
    departureDate,
    packageId,
    packageTitle: pkg.title,
    amount: pkg.price * (Number(travelers) || 1),
    message: message || "",
    paymentMethod: paymentMethod || "",
    status: "pending_confirmation",
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  writeCollection("bookings.json", bookings);

  res.status(201).json({ booking });
});

router.get("/mine", requireAuth, (req, res) => {
  const bookings = readCollection("bookings.json").filter((b) => b.userId === req.userId);
  res.json({ bookings });
});

// Self-service cancellation — a customer can only cancel their own booking,
// and only while it's still pending or confirmed (not once it's paid, since
// that needs a real refund conversation with the team, not a click).
router.patch("/:id/cancel", requireAuth, (req, res) => {
  const bookings = readCollection("bookings.json");
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking || booking.userId !== req.userId) {
    return res.status(404).json({ error: "Booking not found." });
  }
  if (!["pending_confirmation", "confirmed"].includes(booking.status)) {
    return res.status(409).json({ error: `A booking with status "${booking.status}" can't be self-cancelled — contact us directly.` });
  }

  booking.status = "cancelled";
  writeCollection("bookings.json", bookings);
  res.json({ booking });
});

export default router;
