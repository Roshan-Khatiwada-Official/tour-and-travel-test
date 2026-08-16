// Payment gateway integration point.
//
// STATUS: UI-only / mocked. No real payment processing happens yet — every
// method below immediately resolves as "pending manual confirmation" so the
// booking flow works end-to-end, but no money moves and no gateway is called.
//
// TO GO LIVE: once real merchant credentials are supplied for eSewa / Khalti /
// Fonepay / a card processor, replace the body of `initiatePayment` for each
// `method` case with the real integration:
//   - esewa:    build the eSewa v2 payment form/redirect (merchant code, signed
//               total_amount + transaction_uuid) and redirect the browser, or
//               call a backend endpoint that does so.
//   - khalti:   call Khalti's checkout/initiate API from a backend (needs the
//               secret key server-side) and redirect to the returned payment_url.
//   - fonepay:  build the Fonepay QR/redirect request per their merchant docs.
//   - card:     route through a PCI-compliant processor (e.g. Stripe) — never
//               collect raw card numbers directly in this frontend.
// All of these need a backend (serverless function or small API) to hold
// secret keys and verify callbacks — this file is the single place the
// booking flow calls into, so that backend can be wired in here without
// touching Booking.jsx.

export const PAYMENT_METHODS = [
  { id: "esewa", label: "eSewa", color: "#5FBE41" },
  { id: "khalti", label: "Khalti", color: "#5C2D91" },
  { id: "fonepay", label: "Fonepay", color: "#0072BC" },
  { id: "card", label: "Visa / Mastercard", color: "#1D4079" },
];

export async function initiatePayment({ method, amount, bookingId }) {
  const isKnown = PAYMENT_METHODS.some((m) => m.id === method);
  if (!isKnown) throw new Error(`Unknown payment method: ${method}`);

  // Mock network delay so the UI's loading state is exercised realistically.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    status: "pending_manual_confirmation",
    method,
    amount,
    bookingId,
    message:
      "Payment gateway integration is not live yet — our team will contact you directly to confirm payment for this booking.",
  };
}
