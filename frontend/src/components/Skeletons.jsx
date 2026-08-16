// Lightweight shimmer placeholders shown while data is loading from the
// backend, so the page has visible structure immediately instead of a blank
// gap or a plain "Loading..." string.
export function PackageCardSkeleton() {
  return (
    <div className="pkg-card skeleton-card">
      <div className="skeleton-block" style={{ height: "190px" }} />
      <div className="pkg-body">
        <div className="skeleton-line" style={{ width: "40%" }} />
        <div className="skeleton-line" style={{ width: "70%", height: "20px", margin: "10px 0" }} />
        <div className="skeleton-line" style={{ width: "50%" }} />
        <div className="skeleton-block" style={{ height: "40px", marginTop: "16px", borderRadius: "999px" }} />
      </div>
    </div>
  );
}

export function TextSkeleton({ width = "100%", height = "14px", style }) {
  return <div className="skeleton-line" style={{ width, height, ...style }} />;
}
