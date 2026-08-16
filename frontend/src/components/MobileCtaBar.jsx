import { Link } from "react-router-dom";
import { whatsappLink } from "../data/siteConfig";

// Mobile visitors are the majority of traffic on a site like this — a
// persistent bottom action bar keeps "Book Now" and "WhatsApp" one thumb-tap
// away instead of requiring a scroll back to the header on every page.
export default function MobileCtaBar() {
  return (
    <div className="mobile-cta-bar">
      <a className="btn" style={{ background: "#25D366", color: "#fff" }} href={whatsappLink()} target="_blank" rel="noreferrer">
        💬 WhatsApp
      </a>
      <Link className="btn btn-green" to="/booking">
        Book Now
      </Link>
    </div>
  );
}
