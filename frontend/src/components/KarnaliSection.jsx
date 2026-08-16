import { Link } from "react-router-dom";
import PackageCard from "./PackageCard";
import { PackageCardSkeleton } from "./Skeletons";
import { useCatalog } from "../context/CatalogContext";

export default function KarnaliSection() {
  const { karnaliPackages, loading } = useCatalog();
  if (!loading && karnaliPackages.length === 0) return null;

  return (
    <section className="karnali-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow karnali-eyebrow">Our Specialty</span>
            <h2>Explore Karnali — Our Specialty</h2>
            <p className="karnali-lede">
              We're based in Surkhet, right at Karnali's doorstep — Rara Lake, Shey Phoksundo, Dolpa, Jumla and
              Humla aren't add-ons for us, they're the region we know best.
            </p>
          </div>
          <Link to="/karnali" className="btn btn-green">
            Explore All Karnali Packages
          </Link>
        </div>

        <div className="pkg-grid">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <PackageCardSkeleton key={i} />)
            : karnaliPackages.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      </div>
    </section>
  );
}
