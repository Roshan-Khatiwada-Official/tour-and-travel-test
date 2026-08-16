import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import PackageCard from "../components/PackageCard";
import { PackageCardSkeleton } from "../components/Skeletons";
import { useCatalog } from "../context/CatalogContext";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";

const CATEGORIES = ["All", "Trekking", "Cultural", "Pilgrimage", "Adventure", "Wildlife"];
const DESTINATIONS = ["All Destinations", "Everest", "Annapurna", "Mustang", "Pokhara", "Chitwan", "Rara", "Dolpa", "Jumla", "Humla", "Karnali"];
const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "Under NPR 20,000", value: "0-20000" },
  { label: "NPR 20,000 – 50,000", value: "20000-50000" },
  { label: "NPR 50,000 – 100,000", value: "50000-100000" },
  { label: "Above NPR 100,000", value: "100000-" },
];
const SORT_OPTIONS = [
  { label: "Recommended", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Duration: Short to Long", value: "days-asc" },
];

export default function Packages() {
  usePageMeta("Tour Packages", "Browse trekking, cultural, and adventure tour packages across Nepal — Everest Base Camp, Annapurna Circuit, Rara Lake, and more.");
  const { packages, loading } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("style") || "All");
  const [destination, setDestination] = useState(searchParams.get("dest") || "All Destinations");
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  useReveal([category, destination, priceRange, sort, packages.length]);

  const updateFilter = (setter, key) => (value) => {
    setter(value);
    const next = new URLSearchParams(searchParams);
    if (!value || value === "All" || value === "All Destinations") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => {
    setCategory("All");
    setDestination("All Destinations");
    setPriceRange("");
    setSort("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const filtered = useMemo(() => {
    const [min, max] = priceRange ? priceRange.split("-").map((n) => (n === "" ? Infinity : Number(n))) : [0, Infinity];
    const list = packages.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesDest =
        destination === "All Destinations" ||
        p.loc.toLowerCase().includes(destination.toLowerCase()) ||
        p.title.toLowerCase().includes(destination.toLowerCase());
      const matchesPrice = p.price >= min && p.price <= (max === undefined ? Infinity : max);
      return matchesCategory && matchesDest && matchesPrice;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating-desc") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "days-asc") sorted.sort((a, b) => a.days - b.days);
    return sorted;
  }, [destination, category, priceRange, sort, packages]);

  const appliedFilters = [
    category !== "All" && { key: "style", label: category, clear: () => updateFilter(setCategory, "style")("All") },
    destination !== "All Destinations" && { key: "dest", label: destination, clear: () => updateFilter(setDestination, "dest")("All Destinations") },
    priceRange && {
      key: "price",
      label: PRICE_RANGES.find((p) => p.value === priceRange)?.label,
      clear: () => updateFilter(setPriceRange, "price")(""),
    },
  ].filter(Boolean);

  return (
    <>
      <PageHero eyebrow="Popular Packages" title="Explore Our Best Selling Tours" subtitle="Trekking, cultural and pilgrimage packages across Nepal — all customizable." crumbLabel="Tour Packages" />
      <section className="content-page">
        <div className="wrap">
          <div className="filter-row">
            <div className="style-tabs">
              {CATEGORIES.map((t) => (
                <button key={t} className={t === category ? "active" : ""} onClick={() => updateFilter(setCategory, "style")(t)}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <select className="dest-select" value={destination} onChange={(e) => updateFilter(setDestination, "dest")(e.target.value)}>
                {DESTINATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select className="dest-select" value={priceRange} onChange={(e) => updateFilter(setPriceRange, "price")(e.target.value)}>
                {PRICE_RANGES.map((p) => (
                  <option key={p.label} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <select className="dest-select" value={sort} onChange={(e) => updateFilter(setSort, "sort")(e.target.value)}>
                {SORT_OPTIONS.map((s) => (
                  <option key={s.label} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {appliedFilters.length > 0 && (
            <div className="applied-filters">
              <span className="applied-filters-label">Filters:</span>
              {appliedFilters.map((f) => (
                <button key={f.key} className="filter-chip" onClick={f.clear}>
                  {f.label} <span aria-hidden="true">✕</span>
                </button>
              ))}
              <button className="filter-chip-clear" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}

          <p className="result-count">
            {loading ? "Loading..." : `${filtered.length} package${filtered.length === 1 ? "" : "s"} found`}
          </p>

          {loading ? (
            <div className="pkg-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <PackageCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="pkg-grid">
              {filtered.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <p>No packages match those filters yet — try widening your search.</p>
              <button className="btn btn-outline-navy" onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
