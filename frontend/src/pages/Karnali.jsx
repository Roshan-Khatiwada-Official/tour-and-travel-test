import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import PackageCard from "../components/PackageCard";
import { useCatalog } from "../context/CatalogContext";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../context/ToastContext";

const KARNALI_PLACES = [
  { name: "Rara Lake", district: "Mugu", photo: "/images/packages/rara-lake-tour.jpg", text: "Nepal's largest lake, ringed by pine forest.", packageId: "rara-lake-tour" },
  { name: "Shey Phoksundo", district: "Dolpa", photo: "/images/packages/shey-phoksundo-trek.jpg", text: "Nepal's deepest lake inside a remote national park.", packageId: "shey-phoksundo-trek" },
  { name: "Dolpa", district: "Dolpa", photo: "/images/packages/upper-dolpa-trek.jpg", text: "Tibetan-influenced villages and high passes.", packageId: "upper-dolpa-trek" },
  { name: "Jumla", district: "Jumla", photo: "/images/packages/jumla-cultural-tour.jpg", text: "Rice terraces and the ancient Chandannath Temple.", packageId: "jumla-cultural-tour" },
  { name: "Humla", district: "Humla", photo: "/images/packages/humla-adventure-trek.jpg", text: "Nepal's remotest region, on the old trade route to Tibet.", packageId: "humla-adventure-trek" },
];

export default function Karnali() {
  usePageMeta("Karnali Tour Packages", "Karnali is our home turf — Rara Lake, Shey Phoksundo, Dolpa, Jumla and Humla tours & treks planned by a Surkhet-based specialist.");
  const { karnaliPackages } = useCatalog();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();
  useReveal([karnaliPackages.length]);

  return (
    <>
      <PageHero
        eyebrow="Karnali Province"
        title="Karnali Tourism — Our Specialty"
        subtitle="Based in Birendranagar-10, Surkhet, we run more Karnali trips than any general Kathmandu agency — this is the region we know best."
        crumbLabel="Karnali"
      />

      <section className="content-page">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Karnali Destinations</span>
              <h2>Where We Specialize</h2>
            </div>
          </div>
          <div className="pkg-grid">
            {KARNALI_PLACES.map((d) => {
              const saved = has(d.packageId);
              return (
                <Link to={`/packages/${d.packageId}`} className="pkg-card reveal" key={d.name} style={{ display: "block" }}>
                  <div className="pkg-media">
                    <button
                      type="button"
                      className={`wishlist-btn${saved ? " active" : ""}`}
                      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                      aria-pressed={saved}
                      onClick={(e) => {
                        e.preventDefault();
                        toggle(d.packageId);
                        showToast(saved ? `Removed "${d.name}" from wishlist` : `Saved "${d.name}" to wishlist`, "info", 2200);
                      }}
                    >
                      {saved ? "♥" : "♡"}
                    </button>
                    <img src={d.photo} alt={d.name} loading="lazy" />
                  </div>
                  <div className="pkg-body">
                    <div className="loc">📍 {d.district}, Karnali</div>
                    <h3>{d.name}</h3>
                    <p style={{ fontSize: "13.5px", color: "#7b8aa3", marginBottom: "12px" }}>{d.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="content-page" style={{ paddingTop: 0, background: "var(--off-white)" }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Karnali Packages</span>
              <h2>Trekking, Cultural & Adventure Tours</h2>
            </div>
          </div>
          <div className="pkg-grid">
            {karnaliPackages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-banner reveal">
            <h2>Planning a Karnali trip?</h2>
            <p>Talk to a Surkhet-based local team who runs these routes year-round — no middleman, no guesswork.</p>
            <Link to="/inquiry" className="btn" style={{ background: "#fff", color: "var(--red-orange)", fontWeight: 700 }}>
              Enquire About Karnali Tours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
