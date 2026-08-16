import { useState } from "react";
import PageHero from "../components/PageHero";
import { faqs } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";

export default function FAQ() {
  usePageMeta("FAQ", "Frequently asked questions about visas, permits, altitude sickness, and the best season to visit Nepal.");
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Visa, permits, altitude sickness, and the best time to visit — answered." />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          {faqs.map((f, i) => (
            <div className={`faq-item${open === i ? " open" : ""}`} key={f.q}>
              <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="chev" aria-hidden="true">▾</span>
              </button>
              <div className="faq-a" role="region">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
