import { Link } from "react-router-dom";
import { MountainPlaceholder } from "./Icons";
import { PackageCardSkeleton } from "./Skeletons";
import { useCatalog } from "../context/CatalogContext";

export default function SpecialOffers() {
  const { offers, loading } = useCatalog();
  if (!loading && offers.length === 0) return null;

  return (
    <section style={{ background: "var(--off-white)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Limited Time</span>
            <h2>Special Offers & Deals</h2>
          </div>
        </div>

        <div className="pkg-grid">
          {loading && Array.from({ length: 3 }).map((_, i) => <PackageCardSkeleton key={i} />)}
          {!loading && offers.map(({ pkg, discountPercent, discountedPrice, validUntil }) => (
            <div className="pkg-card offer-card reveal" key={pkg.id}>
              <div className="pkg-media">
                <span className="offer-badge">-{discountPercent}%</span>
                {pkg.photo ? (
                  <img src={pkg.photo} alt={`${pkg.title} — ${pkg.loc}`} loading="lazy" />
                ) : (
                  <MountainPlaceholder sky={pkg.sky} ground={pkg.ground} />
                )}
              </div>
              <div className="pkg-body">
                <div className="loc">📍 {pkg.loc}</div>
                <h3>{pkg.title}</h3>
                <div className="pkg-meta">
                  <span>🗓️ {pkg.days} Days</span>
                </div>
                <div className="offer-price-row">
                  <span className="offer-original">NPR {pkg.price.toLocaleString()}</span>
                  <span className="pkg-price">NPR {discountedPrice.toLocaleString()}</span>
                </div>
                <p className="offer-validity">Valid until {new Date(validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link to={`/packages/${pkg.id}`} className="btn btn-outline-navy" style={{ flex: 1, padding: "11px" }}>
                    Details
                  </Link>
                  <Link to={`/booking?package=${pkg.id}`} className="btn btn-green" style={{ flex: 1, padding: "11px" }}>
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
