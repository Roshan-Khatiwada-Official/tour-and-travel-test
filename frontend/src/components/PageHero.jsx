import { Link } from "react-router-dom";

export default function PageHero({ eyebrow, title, subtitle, crumbLabel }) {
  return (
    <div className="page-hero">
      {eyebrow && <span className="eyebrow" style={{ color: "#ffd9c2" }}>{eyebrow}</span>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / {crumbLabel || eyebrow || title}
      </div>
    </div>
  );
}
