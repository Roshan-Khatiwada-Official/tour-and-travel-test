import { Link } from "react-router-dom";
import { MountainPlaceholder } from "./Icons";
import { useCatalog } from "../context/CatalogContext";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../context/ToastContext";

export default function PackageCard({ pkg }) {
  const { getOfferForPackage } = useCatalog();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();
  const offer = getOfferForPackage(pkg.id);
  const saved = has(pkg.id);

  return (
    <div className="pkg-card reveal">
      <div className="pkg-media">
        <span className={`badge ${pkg.badgeClass}`}>{pkg.badge}</span>
        {offer && <span className="offer-badge">-{offer.discountPercent}%</span>}
        <button
          type="button"
          className={`wishlist-btn${saved ? " active" : ""}`}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          onClick={(e) => {
            e.preventDefault();
            toggle(pkg.id);
            showToast(saved ? `Removed "${pkg.title}" from wishlist` : `Saved "${pkg.title}" to wishlist`, "info", 2200);
          }}
        >
          {saved ? "♥" : "♡"}
        </button>
        <div className="trust-tag">
          {pkg.tags.map((t) => (
            <span className="trust-chip" key={t}>
              ✓ {t}
            </span>
          ))}
        </div>
        {pkg.photo ? (
          <img src={pkg.photo} alt={`${pkg.title} — ${pkg.loc}`} loading="lazy" />
        ) : (
          <MountainPlaceholder sky={pkg.sky} ground={pkg.ground} />
        )}
      </div>
      <div className="pkg-body">
        <div className="loc">📍 {pkg.loc}</div>
        <h3>{pkg.title}</h3>
        <div className="stars">
          {"★".repeat(pkg.rating)}
          {"☆".repeat(5 - pkg.rating)}
        </div>
        <div className="pkg-meta">
          <span>🗓️ {pkg.days} Days</span>
          {offer ? (
            <span className="pkg-price-group">
              <span className="offer-original">NPR {pkg.price.toLocaleString()}</span>
              <span className="pkg-price">NPR {offer.discountedPrice.toLocaleString()}</span>
            </span>
          ) : (
            <span className="pkg-price">NPR {pkg.price.toLocaleString()}</span>
          )}
        </div>
        <Link to={`/packages/${pkg.id}`} className="btn btn-outline-navy">
          View Details
        </Link>
      </div>
    </div>
  );
}
