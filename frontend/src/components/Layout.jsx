import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UtilityBar from "./UtilityBar";
import Navbar from "./Navbar";
import MobileDrawer from "./MobileDrawer";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import MobileCtaBar from "./MobileCtaBar";
import CookieConsent from "./CookieConsent";

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  // Redundant on the booking page itself — the whole page is already that CTA.
  const showMobileCta = !pathname.startsWith("/booking");

  // Scroll to top on every route change, like a real multi-page site.
  useEffect(() => {
    window.scrollTo(0, 0);
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <UtilityBar />
      <Navbar onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      {showMobileCta && <MobileCtaBar />}
      <CookieConsent />
    </>
  );
}
