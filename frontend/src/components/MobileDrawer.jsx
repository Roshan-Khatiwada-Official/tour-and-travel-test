import { Link, useNavigate } from "react-router-dom";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { siteConfig, whatsappLink } from "../data/siteConfig";
import { useAuth } from "../context/AuthContext";

const SECTIONS = [
  {
    label: null,
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/packages", label: "Tour Packages" },
      { to: "/karnali", label: "Karnali Specialty" },
      { to: "/destinations", label: "Destinations" },
      { to: "/services", label: "Services" },
    ],
  },
  {
    label: "Explore",
    links: [
      { to: "/gallery", label: "Gallery" },
      { to: "/blog", label: "Blog" },
      { to: "/faq", label: "FAQ" },
      { to: "/inquiry", label: "Online Inquiry" },
      { to: "/contact", label: "Contact Us" },
    ],
  },
];

export default function MobileDrawer({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`drawer${open ? " open" : ""}`}>
      <div className="drawer-bg" onClick={onClose} />
      <div className="drawer-panel">
        <button className="drawer-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>

        {SECTIONS.map((section) => (
          <div key={section.label || "main"} className="drawer-section">
            {section.label && <div className="drawer-section-label">{section.label}</div>}
            {section.links.map((l) => (
              <Link key={l.to} to={l.to} onClick={onClose}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="drawer-section">
          <div className="drawer-section-label">My Account</div>
          {user ? (
            <>
              <Link to="/dashboard" onClick={onClose}>
                My Profile
              </Link>
              <Link
                to="/"
                onClick={() => {
                  onClose();
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={onClose}>
                Login
              </Link>
              <Link to="/signup" onClick={onClose}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="drawer-quick">
          <Link className="btn btn-green" to="/booking" onClick={onClose} style={{ flex: 1 }}>
            Book Now
          </Link>
        </div>
        <div className="drawer-quick">
          <a className="btn btn-navy" href={`tel:+${siteConfig.whatsappNumber}`}>
            📞 Call
          </a>
          <a className="btn" style={{ background: "#25D366", color: "#fff" }} href={whatsappLink()} target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
        </div>
        <div className="drawer-social">
          <a className="social-dot" href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a className="social-dot" href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="social-dot" href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
