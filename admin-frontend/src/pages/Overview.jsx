import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { apiRequest } from "../lib/api";

export default function Overview() {
  const { token } = useAdminAuth();
  const [data, setData] = useState({ bookings: [], inquiries: [], packages: [], offers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiRequest("/bookings", { token }),
      apiRequest("/inquiries", { token }),
      apiRequest("/packages", { token }),
      apiRequest("/offers", { token }),
    ])
      .then(([bookings, inquiries, packages, offers]) => {
        setData({ bookings: bookings.bookings, inquiries: inquiries.inquiries, packages: packages.packages, offers: offers.offers });
      })
      .finally(() => setLoading(false));
  }, [token]);

  const pendingBookings = data.bookings.filter((b) => b.status === "pending_confirmation").length;
  const newInquiries = data.inquiries.filter((i) => i.status === "new").length;

  if (loading) return <p className="admin-empty">Loading...</p>;

  return (
    <>
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="num">{data.bookings.length}</div>
          <div className="label">Total Bookings</div>
        </div>
        <div className="admin-stat-card">
          <div className="num">{pendingBookings}</div>
          <div className="label">Pending Confirmation</div>
        </div>
        <div className="admin-stat-card">
          <div className="num">{data.inquiries.length}</div>
          <div className="label">Total Inquiries ({newInquiries} new)</div>
        </div>
        <div className="admin-stat-card">
          <div className="num">{data.packages.length}</div>
          <div className="label">Packages ({data.offers.length} on offer)</div>
        </div>
      </div>

      <div className="admin-card">
        <h2>Recent Bookings</h2>
        {data.bookings.length === 0 ? (
          <p className="admin-empty">No bookings yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Package</th>
                <th>Traveler</th>
                <th>Departure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.slice(0, 5).map((b) => (
                <tr key={b.id}>
                  <td>{b.bookingRef}</td>
                  <td>{b.packageTitle}</td>
                  <td>{b.fullName}</td>
                  <td>{b.departureDate}</td>
                  <td><span className={`admin-badge ${b.status}`}>{b.status.replace(/_/g, " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: "14px" }}>
          <Link to="/bookings" className="admin-btn admin-btn-outline">View All Bookings</Link>
        </div>
      </div>
    </>
  );
}
