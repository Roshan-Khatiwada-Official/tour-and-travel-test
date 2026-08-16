import { siteConfig } from "../data/siteConfig";

// Renders only the credentials actually set in siteConfig.trust — per the
// "never display certifications you don't hold" rule. If nothing is set yet,
// it shows a plain placeholder note instead of fabricated badges.
export default function TrustBadges() {
  const { trust } = siteConfig;
  const items = [
    trust.panVat && { label: "PAN / VAT", value: trust.panVat },
    trust.companyRegNumber && { label: "Company Registration", value: trust.companyRegNumber },
    trust.iata && { label: "IATA", value: trust.iata },
    trust.natta && { label: "NATTA Member", value: trust.natta },
    trust.taan && { label: "TAAN Member", value: trust.taan },
  ].filter(Boolean);

  if (items.length === 0) {
    return (
      <p style={{ fontSize: "13px", color: "#7b8aa3" }}>
        Registration and membership details (PAN/VAT, company registration, IATA/NATTA/TAAN) will be published here
        once confirmed — available on request in the meantime.
      </p>
    );
  }

  return (
    <div className="trust-badges-grid">
      {items.map((item) => (
        <div className="trust-badge" key={item.label}>
          <span className="trust-badge-label">{item.label}</span>
          <span className="trust-badge-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
