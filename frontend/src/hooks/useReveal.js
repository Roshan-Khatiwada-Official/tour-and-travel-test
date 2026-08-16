import { useEffect } from "react";

// Observes all [data-reveal] elements within `ref` (or the whole doc if no ref)
// and adds the `.in` class when they scroll into view. CSS handles the actual
// transition and already respects prefers-reduced-motion globally.
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in), .pkg-card:not(.in), .service-card:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
