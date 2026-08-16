import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page Not Found", "The page you're looking for doesn't exist.");

  return (
    <div className="notfound">
      <h1>404</h1>
      <p>This trail doesn't exist. Let's get you back on route.</p>
      <Link to="/" className="btn btn-green">
        Back to Home
      </Link>
    </div>
  );
}
