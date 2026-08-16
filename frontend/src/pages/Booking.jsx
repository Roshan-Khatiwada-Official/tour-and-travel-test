import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useCatalog } from "../context/CatalogContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { PAYMENT_METHODS, initiatePayment } from "../lib/payments";
import { apiRequest } from "../lib/api";
import { usePageMeta } from "../hooks/usePageMeta";

const STEPS = ["Trip Details", "Review", "Payment", "Confirmation"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  travelers: 1,
  departureDate: "",
  packageId: "",
  message: "",
};

function validateTripDetails(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!form.packageId) errors.packageId = "Please select a package.";
  if (!form.departureDate) errors.departureDate = "Please choose a departure date.";
  else if (new Date(form.departureDate) < new Date(new Date().toDateString())) {
    errors.departureDate = "Departure date can't be in the past.";
  }
  return errors;
}

export default function Booking() {
  usePageMeta("Book a Trip", "Book your Nepal tour package online with Civil Alliance Tours & Travels — trip details, review and payment in a few simple steps.");
  const { packages, getPackageById } = useCatalog();
  const { token, user } = useAuth();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ...initialForm,
    packageId: searchParams.get("package") || "",
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [method, setMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // `user` loads asynchronously (AuthContext fetches /auth/me after mount),
  // so it's often still null when the useState initializer above runs —
  // that left logged-in visitors with a blank name/email until they typed
  // it themselves. Backfill once the profile arrives, without clobbering
  // anything already typed.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      fullName: f.fullName || user.name || "",
      email: f.email || user.email || "",
      phone: f.phone || user.phone || "",
    }));
  }, [user]);

  const pkg = getPackageById(form.packageId);
  const total = pkg ? pkg.price * Number(form.travelers || 1) : 0;

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFieldErrors((errs) => (errs[field] ? { ...errs, [field]: undefined } : errs));
  };

  const goToReview = (e) => {
    e.preventDefault();
    const errors = validateTripDetails(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showToast("Please fix the highlighted fields.", "error");
      return;
    }
    setFieldErrors({});
    setStep(1);
  };

  const confirmBooking = async () => {
    if (!method) {
      showToast("Please select a payment method to continue.", "error");
      return;
    }
    setProcessing(true);
    try {
      const { booking } = await apiRequest("/bookings", {
        method: "POST",
        token: token || undefined,
        body: { ...form, paymentMethod: method },
      });
      const payment = await initiatePayment({ method, amount: booking.amount, bookingId: booking.bookingRef });
      setResult({ booking, payment });
      setStep(3);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setProcessing(false);
    }
  };

  const progressPercent = (step / (STEPS.length - 1)) * 100;

  return (
    <>
      <PageHero eyebrow="Online Booking" title="Book Your Trip" subtitle="Trip details, review, and payment — in a few simple steps." crumbLabel="Booking" />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <div className="booking-progress-track">
            <div className="booking-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="booking-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`booking-step${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
                <span className="booking-step-num">{i < step ? "✓" : i + 1}</span>
                {s}
              </div>
            ))}
          </div>

          {step === 0 && (
            <form className="form-grid" onSubmit={goToReview} noValidate>
              <div className={`field${fieldErrors.fullName ? " field-invalid" : ""}`}>
                <label>Full Name</label>
                <input type="text" value={form.fullName} onChange={update("fullName")} placeholder="Your name" />
                {fieldErrors.fullName && <span className="field-error">{fieldErrors.fullName}</span>}
              </div>
              <div className={`field${fieldErrors.email ? " field-invalid" : ""}`}>
                <label>Email</label>
                <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
                {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
              </div>
              <div className={`field${fieldErrors.phone ? " field-invalid" : ""}`}>
                <label>Phone Number</label>
                <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+977 ..." />
                {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
              </div>
              <div className="field">
                <label>WhatsApp Number</label>
                <input type="tel" value={form.whatsapp} onChange={update("whatsapp")} placeholder="+977 ... (if different)" />
              </div>
              <div className="field">
                <label>Number of Travelers</label>
                <input type="number" min="1" value={form.travelers} onChange={update("travelers")} />
              </div>
              <div className={`field${fieldErrors.departureDate ? " field-invalid" : ""}`}>
                <label>Preferred Departure Date</label>
                <input type="date" value={form.departureDate} onChange={update("departureDate")} />
                {fieldErrors.departureDate && <span className="field-error">{fieldErrors.departureDate}</span>}
              </div>
              <div className={`field full${fieldErrors.packageId ? " field-invalid" : ""}`}>
                <label>Selected Package</label>
                <select value={form.packageId} onChange={update("packageId")}>
                  <option value="">Select a package</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — NPR {p.price.toLocaleString()}
                    </option>
                  ))}
                </select>
                {fieldErrors.packageId && <span className="field-error">{fieldErrors.packageId}</span>}
              </div>
              <div className="field full">
                <label>Special Requests / Message</label>
                <textarea rows="4" value={form.message} onChange={update("message")} placeholder="Dietary needs, room preferences, anything else we should know..." />
              </div>
              <div className="full">
                <button type="submit" className="btn btn-green" style={{ width: "100%" }}>
                  Continue to Review
                </button>
              </div>
            </form>
          )}

          {step === 1 && pkg && (
            <div className="booking-card">
              <h3 style={{ marginBottom: "16px" }}>Review Your Booking</h3>
              <div className="price-row"><span>Package</span><span>{pkg.title}</span></div>
              <div className="price-row"><span>Name</span><span>{form.fullName}</span></div>
              <div className="price-row"><span>Email</span><span>{form.email}</span></div>
              <div className="price-row"><span>Phone</span><span>{form.phone}</span></div>
              <div className="price-row"><span>Travelers</span><span>{form.travelers}</span></div>
              <div className="price-row"><span>Departure Date</span><span>{form.departureDate}</span></div>
              <div className="price-row total"><span>Estimated Total</span><span>NPR {total.toLocaleString()}</span></div>
              <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                <button className="btn btn-outline-navy" style={{ flex: 1 }} onClick={() => setStep(0)}>
                  Edit Details
                </button>
                <button className="btn btn-green" style={{ flex: 1 }} onClick={() => setStep(2)}>
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ marginBottom: "16px" }}>Choose a Payment Method</h3>
              <p style={{ fontSize: "13.5px", color: "#7b8aa3", marginBottom: "18px" }}>
                Online payment integration is coming soon. Selecting a method below reserves your booking — our team
                will contact you directly to confirm and collect payment.
              </p>
              <div className="payment-methods">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`payment-method${method === m.id ? " active" : ""}`}
                    style={{ "--pm-color": m.color }}
                    onClick={() => setMethod(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <button className="btn btn-outline-navy" style={{ flex: 1 }} onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="btn btn-green" style={{ flex: 1 }} onClick={confirmBooking} disabled={processing}>
                  {processing ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && result && pkg && (
            <div className="booking-card">
              <div className="form-success" style={{ marginBottom: "20px" }}>
                Booking received and saved! You can track it from your dashboard. Our team will be in
                touch within 24 hours to confirm payment.
              </div>
              <div className="price-row"><span>Booking Ref</span><span>{result.booking.bookingRef}</span></div>
              <div className="price-row"><span>Package</span><span>{pkg.title}</span></div>
              <div className="price-row"><span>Traveler</span><span>{form.fullName}</span></div>
              <div className="price-row"><span>Departure Date</span><span>{form.departureDate}</span></div>
              <div className="price-row"><span>Amount (est.)</span><span>NPR {total.toLocaleString()}</span></div>
              <div className="price-row"><span>Payment Method</span><span>{PAYMENT_METHODS.find((m) => m.id === method)?.label}</span></div>
              <div className="price-row total"><span>Payment Status</span><span>Pending Confirmation</span></div>
              <Link to="/dashboard" className="btn btn-outline-navy" style={{ width: "100%", marginTop: "18px" }}>
                Go to My Profile
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
