import PageHero from "../components/PageHero";
import { siteConfig } from "../data/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";

// DRAFT — this is a generic starting template, not legal advice. Have a
// lawyer review it before publishing, especially once analytics/newsletter
// tools are actually connected.
export default function PrivacyPolicy() {
  usePageMeta("Privacy Policy", "How Civil Alliance Tours & Travels collects, uses, and protects your personal information.");

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbLabel="Privacy Policy" subtitle={`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`} />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <p>
            Civil Alliance Tours & Travels ("we", "us") respects your privacy. This policy explains what information we
            collect through this website and how it's used.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Contact details you submit through our enquiry form or newsletter signup (name, email, phone, message).</li>
            <li>Basic usage data if analytics tools (e.g. Google Analytics) are enabled — see below.</li>
          </ul>

          <h2>How We Use It</h2>
          <ul>
            <li>To respond to your travel enquiries and bookings.</li>
            <li>To send occasional newsletter updates, only if you subscribe.</li>
            <li>To understand site usage and improve our services, if analytics are enabled.</li>
          </ul>

          <h2>Cookies & Analytics</h2>
          <p>
            We use a cookie consent banner to ask permission before any non-essential cookies are set. Analytics tracking
            (Google Analytics / Meta Pixel) is only active once configured with a live ID — see the cookie banner on any
            page.
          </p>

          <h2>Data Sharing</h2>
          <p>We do not sell your personal information. We only share data with service providers necessary to operate this website (e.g. email delivery, hosting).</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to {siteConfig.email} or {siteConfig.address}.
          </p>
        </div>
      </section>
    </>
  );
}
