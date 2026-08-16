import { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useToast } from "../context/ToastContext";
import { apiRequest } from "../lib/api";

const STATUSES = ["pending_confirmation", "confirmed", "paid", "cancelled"];
const PAYMENT_LABELS = { esewa: "eSewa", khalti: "Khalti", fonepay: "Fonepay", card: "Visa / Mastercard" };

export default function Bookings() {
  const { token } = useAdminAuth();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const load = () => apiRequest("/bookings", { token }).then((d) => setBookings(d.bookings));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await apiRequest(`/bookings/${id}`, { method: "PATCH", token, body: { status } });
      showToast("Booking status updated.");
      await load();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesStatus = !statusFilter || b.status === statusFilter;
      const matchesSearch =
        !q || b.fullName.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.packageTitle.toLowerCase().includes(q) || b.bookingRef.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  return (
    <div className="admin-card">
      <h2>Bookings</h2>
      <div className="admin-search-row">
        <input type="search" placeholder="Search by name, email, ref or package..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="admin-empty">Loading...</p>
      ) : visible.length === 0 ? (
        <p className="admin-empty">No bookings match your search.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Package</th>
              <th>Traveler</th>
              <th>Contact</th>
              <th>Departure</th>
              <th>Travelers</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id}>
                <td>{b.bookingRef}</td>
                <td>{b.packageTitle}</td>
                <td>{b.fullName}</td>
                <td>
                  {b.email}
                  <br />
                  {b.phone}
                </td>
                <td>{b.departureDate}</td>
                <td>{b.travelers}</td>
                <td>NPR {b.amount.toLocaleString()}</td>
                <td>{PAYMENT_LABELS[b.paymentMethod] || b.paymentMethod || "—"}</td>
                <td>
                  <select className="admin-select" value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
