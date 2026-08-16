import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import { apiRequest } from "../lib/api";

const emptyForm = { packageId: "", discountPercent: "", validUntil: "" };

export default function Offers() {
  const { token } = useAdminAuth();
  const { showToast } = useToast();
  const confirm = useConfirm();
  const [offers, setOffers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = () =>
    Promise.all([apiRequest("/offers", { token }), apiRequest("/packages", { token })]).then(([o, p]) => {
      setOffers(o.offers);
      setPackages(p.packages);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [token]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiRequest("/offers", {
        method: "POST",
        token,
        body: { ...form, discountPercent: Number(form.discountPercent) },
      });
      showToast("Offer added.");
      setForm(emptyForm);
      await load();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id, pkgTitle) => {
    const ok = await confirm({
      title: "Remove this offer?",
      message: `The discount on "${pkgTitle}" will stop showing on the site immediately.`,
      confirmLabel: "Remove",
    });
    if (!ok) return;
    try {
      await apiRequest(`/offers/${id}`, { method: "DELETE", token });
      showToast("Offer removed.");
      await load();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <>
      <div className="admin-card">
        <h2>Add a Special Offer</h2>
        <form className="admin-form-grid" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Package</label>
            <select value={form.packageId} onChange={update("packageId")} required>
              <option value="">Select a package</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Discount %</label>
            <input type="number" min="1" max="90" value={form.discountPercent} onChange={update("discountPercent")} required />
          </div>
          <div className="admin-field">
            <label>Valid Until</label>
            <input type="date" value={form.validUntil} onChange={update("validUntil")} required />
          </div>
          <div className="admin-field full">
            <button type="submit" className="admin-btn admin-btn-green" disabled={submitting}>
              {submitting ? "Adding..." : "Add Offer"}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2>Active Offers</h2>
        {loading ? (
          <p className="admin-empty">Loading...</p>
        ) : offers.length === 0 ? (
          <p className="admin-empty">No offers yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Original</th>
                <th>Discount</th>
                <th>Discounted Price</th>
                <th>Valid Until</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.id}>
                  <td>{o.pkg?.title || o.packageId}</td>
                  <td>{o.pkg ? `NPR ${o.pkg.price.toLocaleString()}` : "—"}</td>
                  <td>{o.discountPercent}%</td>
                  <td>{o.discountedPrice ? `NPR ${o.discountedPrice.toLocaleString()}` : "—"}</td>
                  <td>{o.validUntil}</td>
                  <td>
                    <button className="admin-btn admin-btn-danger" style={{ padding: "6px 12px" }} onClick={() => remove(o.id, o.pkg?.title || o.packageId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
