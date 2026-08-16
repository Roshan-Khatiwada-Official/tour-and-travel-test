import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../context/ToastContext";

const destinations = [
  { name: "Everest Region", province: "Solukhumbu", photo: "/images/packages/everest-base-camp-trek.jpg", packageId: "everest-base-camp-trek" },
  { name: "Annapurna Region", province: "Gandaki", photo: "/images/packages/annapurna-circuit.jpg", packageId: "annapurna-circuit" },
  { name: "Mustang", province: "Gandaki", photo: "/images/packages/muktinath-tour.jpg", packageId: "muktinath-tour" },
  { name: "Rara Lake", province: "Karnali", photo: "/images/packages/rara-lake-tour.jpg", packageId: "rara-lake-tour" },
  { name: "Dolpa", province: "Karnali", photo: "/images/packages/shey-phoksundo-trek.jpg", packageId: "shey-phoksundo-trek" },
  { name: "Pokhara", province: "Gandaki", photo: "/images/packages/pokhara-city-lakes.jpg", packageId: "pokhara-city-lakes" },
  { name: "Chitwan", province: "Bagmati", photo: "/images/packages/chitwan-jungle-safari.jpg", packageId: "chitwan-jungle-safari" },
  { name: "Kathmandu Valley", province: "Bagmati", photo: "/images/site/kathmandu-valley.jpg", packageId: null },
];

export default function Destinations() {
  usePageMeta("Destinations", "Explore Nepal's top trekking and travel destinations — Everest, Annapurna, Mustang, Rara Lake, Dolpa, Pokhara, Chitwan and more.");
  useReveal();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();

  return (
    <>
      <PageHero eyebrow="Destinations" title="Where We Take Travelers" subtitle="From lakeside cities to high Himalayan passes." />
      <section className="content-page">
        <div className="wrap">
          <div className="pkg-grid">
            {destinations.map((d) => {
              const saved = d.packageId ? has(d.packageId) : false;
              return (
                <Link to={d.packageId ? `/packages/${d.packageId}` : "/packages"} className="pkg-card reveal" key={d.name} style={{ display: "block" }}>
                  <div className="pkg-media">
                    {d.packageId && (
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
                    )}
                    <img src={d.photo} alt={d.name} loading="lazy" />
                  </div>
                  <div className="pkg-body">
                    <div className="loc">📍 {d.province} Province</div>
                    <h3>{d.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
