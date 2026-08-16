import { useState } from "react";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SERVICE_OPTIONS = ["Flight Booking", "Hotel Booking", "Vehicle Rental", "Visa Assistance", "Trekking Guide", "Travel Insurance"];

const initialState = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  destination: "",
  travelDate: "",
  travelers: 1,
  services: [],
  message: "",
};

export default function InquiryForm() {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState(initialState);
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFieldErrors((errs) => (errs[field] ? { ...errs, [field]: undefined } : errs));
  };

  const toggleService = (service) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service) ? f.services.filter((s) => s !== service) : [...f.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
    if (!form.destination.trim()) errors.destination = "Tell us where you'd like to go.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("/inquiries", {
        method: "POST",
        token: token || undefined,
        body: { ...form, source: "inquiry" },
      });
      setSent(true);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="form-success">
        Thanks, {form.name}! Your inquiry has been received. A local trip expert will get back to you within 24
        hours.
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className={`field${fieldErrors.name ? " field-invalid" : ""}`}>
        <label>Full Name</label>
        <input type="text" value={form.name} onChange={update("name")} placeholder="Your name" />
        {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
      </div>
      <div className={`field${fieldErrors.email ? " field-invalid" : ""}`}>
        <label>Email</label>
        <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
      </div>
      <div className="field">
        <label>Phone</label>
        <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+977 ..." />
      </div>
      <div className="field">
        <label>WhatsApp</label>
        <input type="tel" value={form.whatsapp} onChange={update("whatsapp")} placeholder="+977 ... (if different)" />
      </div>
      <div className={`field${fieldErrors.destination ? " field-invalid" : ""}`}>
        <label>Destination</label>
        <input type="text" value={form.destination} onChange={update("destination")} placeholder="e.g. Rara Lake, Everest" />
        {fieldErrors.destination && <span className="field-error">{fieldErrors.destination}</span>}
      </div>
      <div className="field">
        <label>Travel Date</label>
        <input type="date" value={form.travelDate} onChange={update("travelDate")} />
      </div>
      <div className="field full">
        <label>Number of Travelers</label>
        <input type="number" min="1" value={form.travelers} onChange={update("travelers")} style={{ maxWidth: "160px" }} />
      </div>
      <div className="field full">
        <label>Preferred Services</label>
        <div className="checkbox-row">
          {SERVICE_OPTIONS.map((s) => (
            <label className="checkbox-chip" key={s}>
              <input type="checkbox" checked={form.services.includes(s)} onChange={() => toggleService(s)} />
              {s}
            </label>
          ))}
        </div>
      </div>
      <div className="field full">
        <label>Message</label>
        <textarea rows="5" value={form.message} onChange={update("message")} placeholder="Tell us about your trip..." />
      </div>
      <div className="full">
        <button type="submit" className="btn btn-green" style={{ width: "100%" }} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
}
