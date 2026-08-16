import { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useToast } from "../context/ToastContext";
import { apiRequest } from "../lib/api";

const STATUSES = ["new", "responded", "closed"];

export default function Inquiries() {
  const { token } = useAdminAuth();
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const load = () => apiRequest("/inquiries", { token }).then((d) => setInquiries(d.inquiries));

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await apiRequest(`/inquiries/${id}`, { method: "PATCH", token, body: { status } });
      showToast("Inquiry status updated.");
      await load();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((i) => {
      const matchesStatus = !statusFilter || i.status === statusFilter;
      const matchesSearch =
        !q || i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || (i.destination || "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, search, statusFilter]);

  return (
    <div className="admin-card">
      <h2>Inquiries</h2>
      <div className="admin-search-row">
        <input type="search" placeholder="Search by name, email or destination..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="admin-empty">Loading...</p>
      ) : visible.length === 0 ? (
        <p className="admin-empty">No inquiries match your search.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>Services</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((i) => (
              <tr key={i.id}>
                <td>{i.source}</td>
                <td>{i.name}</td>
                <td>
                  {i.email}
                  <br />
                  {i.phone}
                </td>
                <td>{i.destination || "—"}</td>
                <td>{i.travelDate || "—"}</td>
                <td>{i.services?.join(", ") || "—"}</td>
                <td style={{ maxWidth: "220px" }}>{i.message}</td>
                <td>
                  <select className="admin-select" value={i.status} onChange={(e) => updateStatus(i.id, e.target.value)}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
