import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { usePageMeta } from "../hooks/usePageMeta";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialState = { name: "", email: "", phone: "", password: "" };

export default function Signup() {
  usePageMeta("Sign Up", "Create a Civil Alliance Tours & Travels account to track your bookings and inquiries.");
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFieldErrors((errs) => (errs[field] ? { ...errs, [field]: undefined } : errs));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = "Please enter your full name.";
    if (!form.email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero eyebrow="My Account" title="Create an Account" subtitle="Sign up to track your bookings and inquiries in one place." crumbLabel="Sign Up" />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "440px" }}>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className={`field full${fieldErrors.name ? " field-invalid" : ""}`}>
              <label>Full Name</label>
              <input type="text" value={form.name} onChange={update("name")} placeholder="Your name" />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>
            <div className={`field full${fieldErrors.email ? " field-invalid" : ""}`}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>
            <div className="field full">
              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+977 ..." />
            </div>
            <div className={`field full${fieldErrors.password ? " field-invalid" : ""}`}>
              <label>Password</label>
              <PasswordField value={form.password} onChange={update("password")} placeholder="At least 6 characters" />
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>
            <div className="full">
              <button type="submit" className="btn btn-green" style={{ width: "100%" }} disabled={submitting}>
                {submitting ? "Creating account..." : "Sign Up"}
              </button>
            </div>
          </form>
          <p style={{ marginTop: "20px", fontSize: "13.5px", color: "#7b8aa3", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--green-dark)", fontWeight: 700 }}>
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
