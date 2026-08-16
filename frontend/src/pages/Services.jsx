import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { services } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Services() {
  usePageMeta("Services", "Flight booking, hotel booking, vehicle rental, visa assistance, trekking, jungle safari, pilgrimage tours & travel insurance — all in one place.");
  useReveal();

  return (
    <>
      <PageHero eyebrow="Our Services" title="We Offer Best Travel Services" subtitle="Everything you need for a Nepal trip, handled by one local team." />
      <section className="content-page">
        <div className="wrap">
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card reveal" id={s.id} key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <p style={{ marginBottom: "18px" }}>Ready to arrange any of these for your trip?</p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/inquiry" className="btn btn-green">
                Send an Enquiry
              </Link>
              <Link to="/booking" className="btn btn-outline-navy">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
