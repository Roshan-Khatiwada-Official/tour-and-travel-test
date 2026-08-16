import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import PackageCard from "../components/PackageCard";
import { useAuth } from "../context/AuthContext";
import { useCatalog } from "../context/CatalogContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../hooks/useWishlist";
import { apiRequest } from "../lib/api";
import { usePageMeta } from "../hooks/usePageMeta";
import { useReveal } from "../hooks/useReveal";

const STATUS_LABELS = {
  pending_confirmation: "Pending Confirmation",
  confirmed: "Confirmed",
  paid: "Paid",
  cancelled: "Cancelled",
  new: "New",
  responded: "Responded",
  closed: "Closed",
};
const CANCELLABLE_STATUSES = ["pending_confirmation", "confirmed"];

export default function Dashboard() {
  usePageMeta("My Profile", "View and manage your Civil Alliance Tours & Travels profile, bookings and inquiries.");
  const { user, token, logout, updateProfile } = useAuth();
  const { packages } = useCatalog();
  const { showToast } = useToast();
  const { ids: wishlistIds } = useWishlist();
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const wishlistPackages = packages.filter((p) => wishlistIds.includes(p.id));
  useReveal([loading, wishlistPackages.length]);

  const startEditingProfile = () => {
    setProfileForm({ name: user?.name || "", phone: user?.phone || "" });
    setEditingProfile(true);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      showToast("Name can't be empty.", "error");
      return;
    }
    setSavingProfile(true);
    try {
      await updateProfile(profileForm);
      showToast("Profile updated.", "success");
      setEditingProfile(false);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    Promise.all([apiRequest("/bookings/mine", { token }), apiRequest("/inquiries/mine", { token })])
      .then(([b, i]) => {
        setBookings(b.bookings);
        setInquiries(i.inquiries);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const cancelBooking = async (id) => {
    setCancellingId(id);
    try {
      const { booking } = await apiRequest(`/bookings/${id}/cancel`, { method: "PATCH", token });
      setBookings((list) => list.map((b) => (b.id === id ? booking : b)));
      showToast("Booking cancelled.", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setCancellingId(null);
      setConfirmingId(null);
    }
  };

  return (
    <>
      <PageHero eyebrow="My Account" title={`Welcome, ${user?.name || ""}`} subtitle="Your profile, bookings and inquiries in one place." crumbLabel="Profile" />
      <section className="content-page">
        <div className="wrap">
          <div className="booking-card" style={{ marginBottom: "50px", position: "static" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3>Profile</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                {!editingProfile && (
                  <button type="button" className="btn btn-outline-navy" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={startEditingProfile}>
                    Edit Profile
                  </button>
                )}
                <button type="button" className="btn btn-outline-navy" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>

            {editingProfile ? (
              <form className="form-grid" onSubmit={saveProfile} noValidate>
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+977 ..."
                  />
                </div>
                <div className="full" style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="btn btn-green" disabled={savingProfile}>
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" className="btn btn-outline-navy" onClick={() => setEditingProfile(false)} disabled={savingProfile}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="price-row"><span>Full Name</span><span>{user?.name}</span></div>
                <div className="price-row"><span>Email</span><span>{user?.email}</span></div>
                <div className="price-row"><span>Phone</span><span>{user?.phone || "—"}</span></div>
                <div className="price-row total">
                  <span>Member Since</span>
                  <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</span>
                </div>
              </>
            )}
          </div>

          <h2>My Bookings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p style={{ color: "#7b8aa3" }}>
              No bookings yet — <Link to="/packages">browse packages</Link> to get started.
            </p>
          ) : (
            <div className="pkg-grid">
              {bookings.map((b) => (
                <div className="booking-card" key={b.id}>
                  <h3 style={{ marginBottom: "10px" }}>{b.packageTitle}</h3>
                  <div className="price-row"><span>Booking Ref</span><span>{b.bookingRef}</span></div>
                  <div className="price-row"><span>Departure</span><span>{b.departureDate}</span></div>
                  <div className="price-row"><span>Travelers</span><span>{b.travelers}</span></div>
                  <div className="price-row total">
                    <span>Status</span>
                    <span className={`status-badge status-${b.status}`}>{STATUS_LABELS[b.status] || b.status}</span>
                  </div>

                  {CANCELLABLE_STATUSES.includes(b.status) &&
                    (confirmingId === b.id ? (
                      <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                        <button
                          className="btn btn-outline-navy"
                          style={{ flex: 1, padding: "9px", fontSize: "13px" }}
                          onClick={() => setConfirmingId(null)}
                          disabled={cancellingId === b.id}
                        >
                          Keep It
                        </button>
                        <button
                          className="btn"
                          style={{ flex: 1, padding: "9px", fontSize: "13px", background: "var(--red-orange)", color: "#fff" }}
                          onClick={() => cancelBooking(b.id)}
                          disabled={cancellingId === b.id}
                        >
                          {cancellingId === b.id ? "Cancelling..." : "Yes, Cancel"}
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline-navy"
                        style={{ width: "100%", marginTop: "14px", padding: "9px", fontSize: "13px" }}
                        onClick={() => setConfirmingId(b.id)}
                      >
                        Cancel Booking
                      </button>
                    ))}
                </div>
              ))}
            </div>
          )}

          <h2 style={{ marginTop: "60px" }}>My Wishlist</h2>
          {wishlistPackages.length === 0 ? (
            <p style={{ color: "#7b8aa3" }}>
              Nothing saved yet — tap the ♡ on any package to keep it here for later.
            </p>
          ) : (
            <div className="pkg-grid">
              {wishlistPackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}

          <h2 style={{ marginTop: "60px" }}>My Inquiries</h2>
          {loading ? (
            <p>Loading...</p>
          ) : inquiries.length === 0 ? (
            <p style={{ color: "#7b8aa3" }}>
              No inquiries yet — <Link to="/inquiry">send one</Link> to get trip planning advice.
            </p>
          ) : (
            <div className="pkg-grid">
              {inquiries.map((i) => (
                <div className="booking-card" key={i.id}>
                  <h3 style={{ marginBottom: "10px" }}>{i.destination || "General Inquiry"}</h3>
                  <div className="price-row"><span>Submitted</span><span>{new Date(i.createdAt).toLocaleDateString()}</span></div>
                  <div className="price-row total">
                    <span>Status</span>
                    <span className={`status-badge status-${i.status}`}>{STATUS_LABELS[i.status] || i.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
