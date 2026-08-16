import { useEffect, useState } from "react";
import { AvatarPlaceholder } from "./Icons";

export default function TestimonialSlider({ testimonials }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const t = testimonials[idx];

  return (
    <div>
      <div className="testi-card testi-slide">
        <div className="quote-mark">&ldquo;</div>
        <p>{t.text}</p>
        <div className="testi-person">
          {t.photo ? (
            <img className="avatar" src={t.photo} alt={t.name} />
          ) : (
            <AvatarPlaceholder className="avatar" color={t.color} />
          )}
          <div>
            <div className="testi-name">{t.name}</div>
            <div className="testi-loc">
              {"⭐".repeat(t.rating)} · {t.loc}
            </div>
          </div>
        </div>
      </div>
      <div className="dots">
        {testimonials.map((_, i) => (
          <button key={i} className={`dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
