import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PackageCard from "../components/PackageCard";
import KarnaliSection from "../components/KarnaliSection";
import SpecialOffers from "../components/SpecialOffers";
import TestimonialSlider from "../components/TestimonialSlider";
import TrustBar from "../components/TrustBar";
import { PackageCardSkeleton } from "../components/Skeletons";
import { services } from "../data/content";
import { testimonials } from "../data/testimonials";
import { useCatalog } from "../context/CatalogContext";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";

const CATEGORIES = ["All", "Trekking", "Cultural", "Pilgrimage", "Adventure", "Wildlife"];

export default function Home() {
  usePageMeta("Home", "Trekking, culture and Himalayan adventure across Nepal, Tibet & Bhutan — planned end-to-end by a government-registered travel partner.");
  const [category, setCategory] = useState("All");
  const { packages, loading } = useCatalog();
  useReveal([category, packages.length]);

  const featured = (category === "All" ? packages : packages.filter((p) => p.category === category)).slice(0, 4);

  return (
    <>
      <Hero />

      <TrustBar />

      {/* ============ POPULAR PACKAGES ============ */}
      <section style={{ paddingTop: "64px" }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Popular Packages</span>
              <h2>Explore Our Best Selling Tours</h2>
            </div>
            <Link to={category === "All" ? "/packages" : `/packages?style=${category}`} className="btn btn-outline-navy">
              View All Packages
            </Link>
          </div>

          <div className="filter-row">
            <div className="style-tabs">
              {CATEGORIES.map((t) => (
                <button key={t} className={t === category ? "active" : ""} onClick={() => setCategory(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="pkg-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <PackageCardSkeleton key={i} />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <p className="empty-state-inline">No {category.toLowerCase()} packages listed yet — check back soon.</p>
          ) : (
            <div className="pkg-grid">
              {featured.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <KarnaliSection />

      <SpecialOffers />

      {/* ============ SERVICES ============ */}
      <section style={{ background: "var(--off-white)" }}>
        <div className="wrap">
          <div className="section-head" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <span className="eyebrow">Our Services</span>
            <h2>We Offer Best Travel Services</h2>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card reveal" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="why-section">
        <div className="wrap">
          <div className="why-grid">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "#8fd7a8" }}>Why Choose Us</span>
              <h2 style={{ fontSize: "clamp(26px,3.2vw,36px)", fontWeight: 800, marginTop: "12px" }}>Your Trusted Travel Partner</h2>
              <div className="why-list">
                {[
                  "Government Registered Company",
                  "Experienced & Professional Team",
                  "Best Price Guarantee",
                  "24/7 Customer Support",
                  "Safe & Comfortable Journey",
                  "Customizable Packages",
                ].map((item) => (
                  <div className="why-item" key={item}>
                    <span className="check">✓</span> {item}
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-green">
                Read More About Us
              </Link>
              <div className="stat-row">
                <div>
                  <div className="stat-num"><span className="accent">500</span>+</div>
                  <div className="stat-label">Happy Travelers</div>
                </div>
                <div>
                  <div className="stat-num"><span className="accent">50</span>+</div>
                  <div className="stat-label">Destinations</div>
                </div>
                <div>
                  <div className="stat-num"><span className="accent">12</span></div>
                  <div className="stat-label">Years of Trust</div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <span className="eyebrow" style={{ color: "#8fd7a8" }}>Testimonials</span>
              <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, margin: "12px 0 22px" }}>What Our Clients Say</h2>
              <TestimonialSlider testimonials={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="partners">
        <div className="wrap" style={{ marginBottom: "26px", textAlign: "center" }}>
          <span className="eyebrow">Our Partners</span>
          <h2 style={{ fontSize: "22px", fontWeight: 800, marginTop: "10px" }}>We Collaborate With</h2>
        </div>
        <div className="marquee">
          {[...Array(2)].flatMap((_, dupe) =>
            ["🏔️ Nepal Tourism Board", "🧭 TAAN", "✈️ Nepal Airlines", "⭐ Tara Air", "🛫 Buddha Air", "🏨 Hotels Association"].map((p) => (
              <div className="partner-logo" key={`${dupe}-${p}`}>
                {p}
              </div>
            ))
          )}
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section>
        <div className="wrap">
          <div className="cta-banner reveal">
            <h2>Ready for your next Himalayan adventure?</h2>
            <p>Talk to a local trip expert and get a custom itinerary within 24 hours — no obligation.</p>
            <Link to="/contact" className="btn" style={{ background: "#fff", color: "var(--red-orange)", fontWeight: 700 }}>
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
