import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";

const CatalogContext = createContext(null);

// Fetches the package/offer catalog once from the backend (which reads it
// from its own JSON files) and shares it across every page/component that
// needs it, instead of each one fetching independently.
export function CatalogProvider({ children }) {
  const [packages, setPackages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/packages"), apiRequest("/offers")])
      .then(([pkgData, offerData]) => {
        setPackages(pkgData.packages);
        setOffers(offerData.offers);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      packages,
      offers,
      loading,
      error,
      getPackageById: (id) => packages.find((p) => p.id === id),
      getOfferForPackage: (id) => offers.find((o) => o.packageId === id),
      relatedPackages: (pkg, limit = 3) =>
        packages.filter((p) => p.id !== pkg.id && p.category === pkg.category).slice(0, limit),
      karnaliPackages: packages.filter((p) => p.loc?.includes("Karnali")),
    }),
    [packages, offers, loading, error]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside a CatalogProvider");
  return ctx;
}
