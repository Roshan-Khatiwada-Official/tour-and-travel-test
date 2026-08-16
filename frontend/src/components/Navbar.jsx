import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavDropdown from "./NavDropdown";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Us" },
  { to: "/packages", label: "Tour Packages" },
];

const TAIL_ITEMS = [
  { to: "/destinations", label: "Destinations" },
  { to: "/contact", label: "Contact Us" },
];

const EXPLORE_LINKS = [
  { to: "/gallery", label: "Photo & Video Gallery" },
  { to: "/blog", label: "Travel Blog" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar({ onOpenDrawer }) {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const accountItems = [
    { to: "/dashboard", label: "My Profile" },
    {
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav className="wrap">
        <Link to="/" className="logo">
          <img className="logo-mark" src="/logo-mark.png" alt="Civil Alliance Tours & Travels logo" />
          <span>
            Civil Alliance
            <small>Tours & Travels</small>
          </span>
        </Link>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/karnali" className={({ isActive }) => `karnali-pill${isActive ? " active" : ""}`}>
              Karnali Specialty
            </NavLink>
          </li>
          {TAIL_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
              Services
            </NavLink>
          </li>
          <NavDropdown label="Explore" items={EXPLORE_LINKS} />
        </ul>

        <div className="nav-cta">
          {user ? (
            <NavDropdown as="div" label={user.name?.split(" ")[0] || "My Account"} items={accountItems} className="nav-cta-secondary" />
          ) : (
            <Link to="/login" className="btn btn-outline-navy nav-cta-secondary">
              Login
            </Link>
          )}
          <Link to="/booking" className="btn btn-green">
            Book Now
          </Link>
          <button className="hamburger" aria-label="Menu" onClick={onOpenDrawer}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
