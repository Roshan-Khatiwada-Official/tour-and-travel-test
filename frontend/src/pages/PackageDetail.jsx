import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";
import { MountainPlaceholder } from "../components/Icons";
import PackageCard from "../components/PackageCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { useReveal } from "../hooks/useReveal";

const LONG_ITINERARY_THRESHOLD = 6;
const COLLAPSED_PREVIEW_COUNT = 3;

export default function PackageDetail() {
  const { id } = useParams();
  const { getPackageById, getOfferForPackage, relatedPackages, loading } = useCatalog();
  const pkg = getPackageById(id);
  const [itineraryExpanded, setItineraryExpanded] = useState(false);
  useReveal([pkg?.id]);

  usePageMeta(pkg ? pkg.title : "Package Not Found", pkg?.summary);

  if (loading) return null;
  if (!pkg) return <Navigate to="/packages" replace />;

  const offer = getOfferForPackage(pkg.id);
  const total = pkg.priceBreakdown.reduce((sum, r) => sum + r.amount, 0) || pkg.price;
  const displayTotal = offer ? Math.round((total * (100 - offer.discountPercent)) / 100) : total;

  const isLongItinerary = pkg.itinerary.length > LONG_ITINERARY_THRESHOLD;
  const visibleDays = isLongItinerary && !itineraryExpanded ? pkg.itinerary.slice(0, COLLAPSED_PREVIEW_COUNT) : pkg.itinerary;

  const mapQuery = encodeURIComponent(`${pkg.title}, ${pkg.loc}, Nepal`);
  const related = relatedPackages(pkg);
  const galleryPhotos = [pkg, ...related]
    .filter((p) => p.photo)
    .map((p) => ({ src: p.photo, alt: `${p.title} — ${p.loc}` }));

  return (
    <>
      <div className="page-hero" style={{ paddingBottom: "60px" }}>
        <span className="eyebrow" style={{ color: "#ffd9c2" }}>{pkg.loc}</span>
        <h1>{pkg.title}</h1>
        <p>{pkg.summary}</p>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/packages">Tour Packages</Link> / {pkg.title}
        </div>
      </div>

      <section className="content-page" style={{ paddingTop: "50px" }}>
        <div className="wrap">
          <div className="pkg-media" style={{ height: "360px", borderRadius: "20px", marginBottom: "40px" }}>
            {offer && <span className="offer-badge" style={{ top: "18px", right: "18px" }}>-{offer.discountPercent}% OFF</span>}
            {pkg.photo ? (
              <img src={pkg.photo} alt={`${pkg.title} — ${pkg.loc}`} />
            ) : (
              <MountainPlaceholder sky={pkg.sky} ground={pkg.ground} />
            )}
          </div>

          <div className="pkg-detail-grid">
            <div>
              <h2>Day-by-Day Itinerary</h2>
              {visibleDays.map((day) => (
                <div className="itinerary-day" key={day.title}>
                  <h4>{day.title}</h4>
                  <p>{day.text}</p>
                </div>
              ))}
              {isLongItinerary && (
                <button type="button" className="btn btn-outline-navy" style={{ marginBottom: "10px" }} onClick={() => setItineraryExpanded((v) => !v)}>
                  {itineraryExpanded ? "Show Fewer Days" : `Show All ${pkg.itinerary.length} Days`}
                </button>
              )}

              <h2>Inclusions & Exclusions</h2>
              <div className="inc-exc">
                <div>
                  <h3 style={{ color: "var(--green-dark)" }}>Included</h3>
                  <ul>
                    {pkg.inclusions.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: "var(--red-orange)" }}>Not Included</h3>
                  <ul>
                    {pkg.exclusions.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {galleryPhotos.length > 0 && (
                <>
                  <h2>Photo Gallery</h2>
                  <div className="gallery-grid" style={{ marginTop: "16px" }}>
                    {galleryPhotos.map((p) => (
                      <div className="gallery-item" key={p.src}>
                        <img src={p.src} alt={p.alt} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2>Route Map</h2>
              <div className="map-embed">
                <iframe
                  title={`Map for ${pkg.title}`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p style={{ fontSize: "12px", color: "#7b8aa3", marginTop: "8px" }}>
                Approximate area shown — exact route and stops are confirmed with your guide before departure.
              </p>
            </div>

            <div className="booking-card">
              <h3 style={{ marginBottom: "16px" }}>Price Breakdown</h3>
              {pkg.priceBreakdown.map((row) => (
                <div className="price-row" key={row.label}>
                  <span>{row.label}</span>
                  <span>{row.amount ? `NPR ${row.amount.toLocaleString()}` : "Included"}</span>
                </div>
              ))}
              {offer ? (
                <>
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span style={{ textDecoration: "line-through", color: "#9aa8bd" }}>NPR {total.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Special offer</span>
                    <span style={{ color: "var(--red-orange)", fontWeight: 700 }}>-{offer.discountPercent}%</span>
                  </div>
                </>
              ) : null}
              <div className="price-row total">
                <span>Total</span>
                <span>NPR {displayTotal.toLocaleString()}</span>
              </div>
              <Link to={`/booking?package=${pkg.id}`} className="btn btn-green" style={{ width: "100%", marginTop: "18px" }}>
                Book Now
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: "70px" }}>
              <h2>You Might Also Like</h2>
              <div className="pkg-grid">
                {related.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
