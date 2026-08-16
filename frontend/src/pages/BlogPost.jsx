import { useParams, Link, Navigate } from "react-router-dom";
import { getPostById } from "../data/blogPosts";
import { usePageMeta } from "../hooks/usePageMeta";

export default function BlogPost() {
  const { id } = useParams();
  const post = getPostById(id);
  usePageMeta(post?.title, post?.excerpt);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <div className="page-hero" style={{ paddingBottom: "60px" }}>
        <span className="eyebrow" style={{ color: "#ffd9c2" }}>
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </span>
        <h1>{post.title}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / {post.title}
        </div>
      </div>
      <section className="content-page" style={{ paddingTop: "50px" }}>
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <div className="blog-media" style={{ height: "300px", borderRadius: "20px", marginBottom: "30px" }}>
            <img src={post.photo} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <Link to="/blog" className="btn btn-outline-navy" style={{ marginTop: "20px" }}>
            ← Back to Blog
          </Link>
        </div>
      </section>
    </>
  );
}
