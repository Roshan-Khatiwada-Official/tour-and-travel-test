import { useState } from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { siteConfig, whatsappLink } from "../data/siteConfig";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to a real email service (Mailchimp, Brevo, etc.)
    // once you choose one — this currently only confirms in the UI.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="foot-logo">
              <img src="/logo-mark.png" alt="Civil Alliance Tours & Travels logo" />
              <strong>Civil Alliance</strong>
            </div>
            <p style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
              Your trusted travel partner for unforgettable journeys across Nepal, Tibet & Bhutan.
            </p>
            <div className="foot-social">
              <a className="social-dot" href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a className="social-dot" href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a className="social-dot" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a className="social-dot" href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
            <h5 style={{ marginTop: "22px" }}>Newsletter</h5>
            {subscribed ? (
              <p style={{ fontSize: "13px", color: "#4ADE80" }}>Thanks — you're subscribed!</p>
            ) : (
              <form className="newsletter" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/packages">Tour Packages</Link></li>
              <li><Link to="/karnali">Karnali Specialty</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
              <li><Link to="/inquiry">Online Inquiry</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5>Popular Destinations</h5>
            <ul>
              <li><Link to="/packages/rara-lake-tour">Rara Lake</Link></li>
              <li><Link to="/packages/shey-phoksundo-trek">Shey Phoksundo</Link></li>
              <li><Link to="/packages/everest-base-camp-trek">Everest</Link></li>
              <li><Link to="/packages/annapurna-circuit">Annapurna</Link></li>
              <li><Link to="/packages/chitwan-jungle-safari">Chitwan Jungle Safari</Link></li>
              <li><Link to="/karnali">More Karnali Tours</Link></li>
            </ul>
          </div>

          <div>
            <h5>Support</h5>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms-and-conditions">Booking Policy</Link></li>
              <li><Link to="/terms-and-conditions">Cancellation Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
            <h5 style={{ marginTop: "22px" }}>Contact</h5>
            <ul>
              <li>📍 {siteConfig.address}</li>
              <li>📞 {siteConfig.phone1}</li>
              <li>✉️ {siteConfig.email}</li>
            </ul>
          </div>
        </div>
        <div className="bottom-bar">
          <span>© {new Date().getFullYear()} Civil Alliance Tours & Travels Pvt. Ltd. All Rights Reserved.</span>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
