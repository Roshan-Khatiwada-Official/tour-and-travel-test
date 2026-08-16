import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";

const galleryGroups = [
  {
    region: "Everest Region",
    photos: [{ src: "/images/packages/everest-base-camp-trek.jpg", alt: "Everest, seen from Base Camp approach" }],
  },
  {
    region: "Annapurna Region",
    photos: [
      { src: "/images/packages/annapurna-circuit.jpg", alt: "Annapurna Circuit landscape" },
      { src: "/images/site/poon-hill.jpg", alt: "Sunrise over the Annapurna range from Poon Hill" },
      { src: "/images/site/thorong-la-pass.jpg", alt: "Thorong La Pass, Annapurna Circuit" },
      { src: "/images/packages/muktinath-tour.jpg", alt: "Muktinath Temple, Mustang" },
    ],
  },
  {
    region: "Karnali",
    photos: [
      { src: "/images/packages/rara-lake-tour.jpg", alt: "Rara Lake, Mugu" },
      { src: "/images/packages/shey-phoksundo-trek.jpg", alt: "Shey Phoksundo Lake, Dolpa" },
      { src: "/images/packages/upper-dolpa-trek.jpg", alt: "Upper Dolpa trekking camp" },
      { src: "/images/packages/jumla-cultural-tour.jpg", alt: "Jumla, Karnali" },
      { src: "/images/packages/humla-adventure-trek.jpg", alt: "Simikot, Humla" },
    ],
  },
  {
    region: "Pokhara",
    photos: [{ src: "/images/packages/pokhara-city-lakes.jpg", alt: "Phewa Lake, Pokhara" }],
  },
  {
    region: "Chitwan",
    photos: [{ src: "/images/packages/chitwan-jungle-safari.jpg", alt: "Rhinos at Chitwan National Park" }],
  },
  {
    region: "Kathmandu Valley",
    photos: [{ src: "/images/site/kathmandu-valley.jpg", alt: "Kathmandu Durbar Square" }],
  },
];

const photos = galleryGroups.flatMap((g) => g.photos);

let runningOffset = 0;
const groupsWithOffset = galleryGroups.map((group) => {
  const startIndex = runningOffset;
  runningOffset += group.photos.length;
  return { ...group, startIndex };
});

export default function Gallery() {
  usePageMeta("Gallery", "A photo gallery of Civil Alliance Tours & Travels' trekking and cultural tour destinations across Nepal.");
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <PageHero eyebrow="Gallery" title="Moments From the Trail" subtitle="A look at the landscapes and journeys we guide travelers through." />
      {groupsWithOffset.map((group, gi) => (
        <section className="content-page gallery-region" style={{ background: gi % 2 ? "var(--off-white)" : undefined }} key={group.region}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <span className="eyebrow">{group.region}</span>
                <h2>{group.region}</h2>
              </div>
            </div>
            <div className="gallery-grid">
              {group.photos.map((p, i) => (
                <button
                  type="button"
                  className="gallery-item"
                  key={p.src}
                  onClick={() => setActive(group.startIndex + i)}
                  aria-label={`Open photo: ${p.alt}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActive(null)}>
          <button className="lightbox-close" aria-label="Close" onClick={() => setActive(null)}>
            ✕
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={photos[active].src} alt={photos[active].alt} style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      )}
    </>
  );
}
