import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import { apiRequest } from "../lib/api";

const BADGE_CLASSES = ["badge-best", "badge-popular", "badge-adv", "badge-cultural"];
const CATEGORIES = ["Trekking", "Cultural", "Pilgrimage", "Adventure", "Wildlife"];

const emptyForm = {
  title: "",
  category: CATEGORIES[0],
  loc: "",
  days: "",
  price: "",
  badge: "",
  badgeClass: "badge-cultural",
  tags: "",
  rating: 5,
  sky: "#3A9BDC",
  ground: "#0B2545",
  summary: "",
  inclusions: "",
  exclusions: "",
};

export default function Packages() {
  const { token } = useAdminAuth();
  const { showToast } = useToast();
  const confirm = useConfirm();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiRequest("/packages", { token }).then((d) => setPackages(d.packages));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [token]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const startEdit = (pkg) => {
    setEditingId(pkg.id);
    setForm({
      title: pkg.title,
      category: pkg.category || CATEGORIES[0],
      loc: pkg.loc,
      days: pkg.days,
      price: pkg.price,
      badge: pkg.badge,
      badgeClass: pkg.badgeClass,
      tags: pkg.tags.join(", "),
      rating: pkg.rating,
      sky: pkg.sky,
      ground: pkg.ground,
      summary: pkg.summary,
      inclusions: pkg.inclusions.join("\n"),
      exclusions: pkg.exclusions.join("\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      title: form.title,
      category: form.category,
      loc: form.loc,
      days: Number(form.days),
      price: Number(form.price),
      badge: form.badge,
      badgeClass: form.badgeClass,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      rating: Number(form.rating),
      sky: form.sky,
      ground: form.ground,
      summary: form.summary,
      inclusions: form.inclusions.split("\n").map((s) => s.trim()).filter(Boolean),
      exclusions: form.exclusions.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await apiRequest(`/packages/${editingId}`, { method: "PUT", token, body });
        showToast("Package updated.");
      } else {
        await apiRequest("/packages", { method: "POST", token, body });
        showToast("Package added.");
      }
      cancelEdit();
      await load();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id, title) => {
    const ok = await confirm({
      title: "Delete this package?",
      message: `"${title}" will be removed, along with any special offers tied to it. This can't be undone.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    try {
      await apiRequest(`/packages/${id}`, { method: "DELETE", token });
      showToast("Package deleted.");
      await load();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const visiblePackages = packages.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.loc.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  return (
    <>
      <div className="admin-card">
        <h2>{editingId ? `Edit Package: ${editingId}` : "Add a Package"}</h2>
        <p style={{ fontSize: "12.5px", color: "#7b8aa3", marginTop: "-10px", marginBottom: "16px" }}>
          Day-by-day itinerary editing isn't available in this panel yet — edit{" "}
          <code>backend/data/packages.json</code> directly for that field if needed.
        </p>
        <form className="admin-form-grid" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Title</label>
            <input value={form.title} onChange={update("title")} required />
          </div>
          <div className="admin-field">
            <label>Category</label>
            <select value={form.category} onChange={update("category")}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Location</label>
            <input value={form.loc} onChange={update("loc")} placeholder="e.g. Mugu, Karnali" />
          </div>
          <div className="admin-field">
            <label>Days</label>
            <input type="number" min="1" value={form.days} onChange={update("days")} required />
          </div>
          <div className="admin-field">
            <label>Price (NPR)</label>
            <input type="number" min="0" value={form.price} onChange={update("price")} required />
          </div>
          <div className="admin-field">
            <label>Badge Text</label>
            <input value={form.badge} onChange={update("badge")} placeholder="e.g. Best Seller" />
          </div>
          <div className="admin-field">
            <label>Badge Style</label>
            <select value={form.badgeClass} onChange={update("badgeClass")}>
              {BADGE_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Tags (comma separated)</label>
            <input value={form.tags} onChange={update("tags")} placeholder="TAAN Verified, Small Group" />
          </div>
          <div className="admin-field">
            <label>Rating (1-5)</label>
            <input type="number" min="1" max="5" value={form.rating} onChange={update("rating")} />
          </div>
          <div className="admin-field">
            <label>Card Color (sky)</label>
            <input type="color" value={form.sky} onChange={update("sky")} />
          </div>
          <div className="admin-field">
            <label>Card Color (ground)</label>
            <input type="color" value={form.ground} onChange={update("ground")} />
          </div>
          <div className="admin-field full">
            <label>Summary</label>
            <textarea rows="2" value={form.summary} onChange={update("summary")} />
          </div>
          <div className="admin-field">
            <label>Inclusions (one per line)</label>
            <textarea rows="4" value={form.inclusions} onChange={update("inclusions")} />
          </div>
          <div className="admin-field">
            <label>Exclusions (one per line)</label>
            <textarea rows="4" value={form.exclusions} onChange={update("exclusions")} />
          </div>
          <div className="admin-field full" style={{ flexDirection: "row", gap: "10px" }}>
            <button type="submit" className="admin-btn admin-btn-green" disabled={submitting}>
              {submitting ? "Saving..." : editingId ? "Save Changes" : "Add Package"}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn-outline" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2>All Packages</h2>
        <div className="admin-search-row">
          <input type="search" placeholder="Search by title, location or category..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {loading ? (
          <p className="admin-empty">Loading...</p>
        ) : visiblePackages.length === 0 ? (
          <p className="admin-empty">No packages match "{search}".</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Days</th>
                <th>Price</th>
                <th>Badge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visiblePackages.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category || "—"}</td>
                  <td>{p.loc}</td>
                  <td>{p.days}</td>
                  <td>NPR {p.price.toLocaleString()}</td>
                  <td>{p.badge}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "6px 12px", marginRight: "8px" }} onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button className="admin-btn admin-btn-danger" style={{ padding: "6px 12px" }} onClick={() => remove(p.id, p.title)}>
                      Delete
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
