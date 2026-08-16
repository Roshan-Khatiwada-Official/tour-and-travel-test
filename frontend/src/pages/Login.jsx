import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { usePageMeta } from "../hooks/usePageMeta";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  usePageMeta("Login", "Log in to your Civil Alliance Tours & Travels account to view your bookings and inquiries.");
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setFieldErrors((errs) => (errs[field] ? { ...errs, [field]: undefined } : errs));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email)) errors.email = "Enter a valid email address.";
    if (!form.password) errors.password = "Please enter your password.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero eyebrow="My Account" title="Log In" subtitle="Access your bookings and inquiries." crumbLabel="Login" />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "440px" }}>
          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className={`field full${fieldErrors.email ? " field-invalid" : ""}`}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>
            <div className={`field full${fieldErrors.password ? " field-invalid" : ""}`}>
              <label>Password</label>
              <PasswordField value={form.password} onChange={update("password")} placeholder="••••••••" />
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>
            <div className="full">
              <button type="submit" className="btn btn-green" style={{ width: "100%" }} disabled={submitting}>
                {submitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
          <p style={{ marginTop: "20px", fontSize: "13.5px", color: "#7b8aa3", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--green-dark)", fontWeight: 700 }}>
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
