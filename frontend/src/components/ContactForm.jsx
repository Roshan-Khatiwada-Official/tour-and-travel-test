import { useState } from "react";
import { useCatalog } from "../context/CatalogContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { apiRequest } from "../lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialState = { name: "", email: "", phone: "", packageInterest: "", message: "" };

export default function ContactForm({ defaultPackage = "" }) {
  const { packages } = useCatalog();
  const { token } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ ...initialState, packageInterest: defaultPackage });
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFieldErrors((errs) => (errs[field] ? { ...errs, [field]: undefined } : errs));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
    if (!form.message.trim()) errors.message = "Tell us a little about your trip.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("/inquiries", {
        method: "POST",
        token: token || undefined,
        body: {
          source: "contact",
          name: form.name,
          email: form.email,
          phone: form.phone,
          destination: form.packageInterest,
          message: form.message,
        },
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
        Thanks, {form.name}! Your enquiry has been received — we'll get back to you within 24 hours.
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
        <label>Package Interest</label>
        <select value={form.packageInterest} onChange={update("packageInterest")}>
          <option value="">Select a package</option>
          {packages.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
          <option value="Custom / Not sure yet">Custom / Not sure yet</option>
        </select>
      </div>
      <div className={`field full${fieldErrors.message ? " field-invalid" : ""}`}>
        <label>Message</label>
        <textarea rows="5" value={form.message} onChange={update("message")} placeholder="Tell us about your trip..." />
        {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
      </div>
      <div className="full">
        <button type="submit" className="btn btn-green" style={{ width: "100%" }} disabled={submitting}>
          {submitting ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
