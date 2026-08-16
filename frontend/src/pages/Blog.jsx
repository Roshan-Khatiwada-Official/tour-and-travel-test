import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { blogPosts } from "../data/blogPosts";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Blog() {
  usePageMeta("Blog", "Trekking tips, seasonal guides, and travel advice from Civil Alliance Tours & Travels.");

  return (
    <>
      <PageHero eyebrow="Blog" title="Stories & Trekking Guides" subtitle="Practical advice from the trail, written by our team." />
      <section className="content-page">
        <div className="wrap">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} className="blog-card" key={post.id}>
                <div className="blog-media">
                  <img src={post.photo} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-body">
                  <div className="blog-meta">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="btn btn-outline-navy" style={{ padding: "8px 18px", fontSize: "13px" }}>
                    Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
