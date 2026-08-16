import PageHero from "../components/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { AvatarPlaceholder } from "../components/Icons";
import TrustBadges from "../components/TrustBadges";
import { siteConfig } from "../data/siteConfig";

// DRAFT COPY — replace with your real company story and guide bios. This is
// placeholder text written to match your voice; it is not real content.
const guides = [
  { name: "Bikash Rana", role: "Lead Trekking Guide, 10+ yrs", color: "#FF6B35" },
  { name: "Sunita Bhandari", role: "Cultural Tours Specialist", color: "#0EA5A4" },
  { name: "Prakash K.C.", role: "High-Altitude Guide", color: "#7C3AED" },
];

export default function About() {
  usePageMeta("About Us", "Learn about Civil Alliance Tours & Travels — a government-registered Nepali travel agency with 12+ years of trekking and cultural tour experience.");

  return (
    <>
      <PageHero eyebrow="About Us" title="Your Trusted Travel Partner" subtitle="Locally rooted in Karnali Province, trusted by travelers from across Nepal and abroad." />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "820px" }}>
          <span className="eyebrow">Our Story</span>
          <h2>Built by people who love these mountains</h2>
          <p>
            [Placeholder — replace with your real founding story.] Civil Alliance Tours & Travels started in Surkhet with a
            simple goal: make Karnali's trekking routes and Nepal's classic Himalayan trails accessible through honest planning,
            licensed guides, and fair prices. Over 12 years we've grown from a two-person office to a full-service agency
            handling flights, permits, accommodation, and guided treks across Nepal, Tibet and Bhutan.
          </p>
          <p>
            We're a government-registered company and active TAAN members, which means every trek we run follows verified
            safety and permit standards — not just marketing claims.
          </p>

          <span className="eyebrow" style={{ marginTop: "30px", display: "inline-flex" }}>Our Guides</span>
          <h2>Meet the team on the trail</h2>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {guides.map((g) => (
              <div className="service-card in" key={g.name}>
                <AvatarPlaceholder color={g.color} className="service-icon" />
                <h4>{g.name}</h4>
                <p>{g.role}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "16px", fontSize: "13px", color: "#7b8aa3" }}>
            Guide photos are placeholders — replace with real team photos once supplied.
          </p>

          <span className="eyebrow" style={{ marginTop: "30px", display: "inline-flex" }}>Trust & Certifications</span>
          <h2>Registration & Memberships</h2>
          <TrustBadges />

          <span className="eyebrow" style={{ marginTop: "30px", display: "inline-flex" }}>Google Reviews</span>
          <h2>What Google Says</h2>
          {siteConfig.trust.googleRating ? (
            <p>
              Rated {siteConfig.trust.googleRating} / 5 from {siteConfig.trust.googleReviewCount} reviews on our{" "}
              <a href={siteConfig.trust.googleReviewsUrl} target="_blank" rel="noreferrer" style={{ color: "var(--green-dark)", fontWeight: 700 }}>
                Google Business Profile
              </a>
              .
            </p>
          ) : (
            <p style={{ fontSize: "13px", color: "#7b8aa3" }}>
              Our Google Business Profile rating will be linked here once the profile is set up and verified.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
