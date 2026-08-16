import { useEffect } from "react";

// Lightweight per-page SEO: sets <title> and meta description on mount.
// This covers client-side navigation; because this is a CSR (not SSR/SSG) app,
// social-media link previews will still show the tags from index.html for the
// homepage. For per-page OG previews on shared links, this project would need
// to move to a server-rendered framework (e.g. Next.js) in a later phase.
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} | Civil Alliance Tours & Travels`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
