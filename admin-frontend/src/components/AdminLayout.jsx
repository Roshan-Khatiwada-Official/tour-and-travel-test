import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Overview", end: true },
  { to: "/bookings", label: "Bookings" },
  { to: "/inquiries", label: "Inquiries" },
  { to: "/packages", label: "Packages" },
  { to: "/offers", label: "Offers" },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          Civil Alliance
          <small>Admin Panel</small>
        </div>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button
            className="admin-logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Admin Panel</h1>
          <span style={{ fontSize: "13.5px", color: "#7b8aa3", fontWeight: 600 }}>{admin?.email}</span>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
