// Fast, scannable trust signals placed right after the first package grid —
// research on travel-site UX shows visitors need to understand what makes an
// operator different within ~5 seconds; stacking this after a wall of cards
// buries it, so it gets its own strip with real (not fabricated) numbers
// already used elsewhere on the site (About page "Why Choose Us" stats).
const ITEMS = [
  { icon: "🏔️", label: "Karnali Specialist", sub: "Rara, Dolpa, Jumla & Humla" },
  { icon: "📋", label: "Government Registered", sub: "Licensed travel operator" },
  { icon: "⚡", label: "Fast Response", sub: "Reply within 24 hours" },
  { icon: "🤝", label: "500+ Travelers", sub: "Served across 12 years" },
];

export default function TrustBar() {
  return (
    <div className="trust-strip">
      <div className="wrap">
        <div className="trust-strip-grid">
          {ITEMS.map((item) => (
            <div className="trust-strip-item" key={item.label}>
              <span className="trust-strip-icon">{item.icon}</span>
              <div>
                <div className="trust-strip-label">{item.label}</div>
                <div className="trust-strip-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
