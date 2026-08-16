import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "civilalliance_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-bar" role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies to improve your experience and, once connected, for analytics. See our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>
      <button className="btn btn-green" onClick={accept}>
        Accept
      </button>
    </div>
  );
}
