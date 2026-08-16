import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HERO_SLIDES = [
  { src: "/images/site/hero-himalaya.jpg", alt: "Mardi Himal trekking route, Nepal" },
  { src: "/images/packages/everest-base-camp-trek.jpg", alt: "Everest North Face toward Base Camp" },
  { src: "/images/packages/rara-lake-tour.jpg", alt: "Rara Lake, Mugu" },
  { src: "/images/site/poon-hill.jpg", alt: "Sunrise over the Annapurna range from Poon Hill" },
  { src: "/images/packages/pokhara-city-lakes.jpg", alt: "Phewa Lake, Pokhara" },
];
const SLIDE_INTERVAL_MS = 5000;

const TABS = ["🧭 Tour Packages", "✈️ Flight Ticket", "🏨 Hotel Booking", "🚐 Vehicle Rental"];
const TOUR_TYPES = ["Any Type", "Trekking", "Cultural", "Pilgrimage", "Adventure", "Family"];
const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "Under NPR 20,000", value: "0-20000" },
  { label: "NPR 20,000 – 50,000", value: "20000-50000" },
  { label: "NPR 50,000 – 100,000", value: "50000-100000" },
  { label: "Above NPR 100,000", value: "100000-" },
];

export default function Hero() {
  const [tab, setTab] = useState(0);
  const [destination, setDestination] = useState("");
  const [tourType, setTourType] = useState("Any Type");
  const [priceRange, setPriceRange] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (tab !== 0) {
      navigate("/services");
      return;
    }
    const params = new URLSearchParams();
    if (destination) params.set("dest", destination);
    if (tourType && tourType !== "Any Type") params.set("style", tourType);
    if (priceRange) params.set("price", priceRange);
    if (departDate) params.set("date", departDate);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <section className="hero">
      <div className="hero-media">
        {HERO_SLIDES.map((s, i) => (
          <img key={s.src} src={s.src} alt={s.alt} className={`hero-photo${i === slide ? " active" : ""}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="hero-scrim" />
        <div className="hero-slide-dots">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`hero-slide-dot${i === slide ? " active" : ""}`}
              aria-label={`Show slide ${i + 1}: ${s.alt}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
      <div className="hero-content">
        <span className="eyebrow">Nepal · Karnali · Tibet · Bhutan</span>
        <h1>
          Discover the Beauty of <span className="accent">Nepal</span>
        </h1>
        <p>Trekking, culture and Himalayan adventure — planned end-to-end by a locally rooted, government-registered travel partner.</p>
        <div className="hero-btns">
          <Link to="/packages" className="btn btn-green">
            Explore Tours
          </Link>
          <Link to="/booking" className="btn btn-ghost">
            Book Now
          </Link>
        </div>
      </div>

      <div className="wrap">
        <form className="search-card" onSubmit={handleSearch}>
          <div className="tabs">
            {TABS.map((label, i) => (
              <button key={label} type="button" className={`tab-btn${i === tab ? " active" : ""}`} onClick={() => setTab(i)}>
                {label}
              </button>
            ))}
          </div>
          {tab === 0 ? (
            <div className="search-fields tour-search-fields">
              <div className="field">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Where to? e.g. Everest, Rara Lake"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Tour Type</label>
                <select value={tourType} onChange={(e) => setTourType(e.target.value)}>
                  {TOUR_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Duration</label>
                <select>
                  <option>Any Duration</option>
                  <option>3 Days</option>
                  <option>5 Days</option>
                  <option>7 Days</option>
                  <option>10+ Days</option>
                </select>
              </div>
              <div className="field">
                <label>Price Range</label>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                  {PRICE_RANGES.map((p) => (
                    <option key={p.label} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Departure Date</label>
                <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
              </div>
              <div className="field">
                <label style={{ opacity: 0 }}>Go</label>
                <button type="submit" className="btn btn-green">
                  Search Tours
                </button>
              </div>
            </div>
          ) : (
            <div className="search-fields">
              <div className="field">
                <label>{tab === 1 ? "From / To" : tab === 2 ? "City" : "Pickup Location"}</label>
                <input type="text" placeholder="e.g. Kathmandu" />
              </div>
              <div className="field">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="field">
                <label>{tab === 3 ? "Vehicle Type" : "Guests"}</label>
                <select>
                  <option>{tab === 3 ? "Any Vehicle" : "1 Guest"}</option>
                  <option>{tab === 3 ? "Jeep" : "2 Guests"}</option>
                  <option>{tab === 3 ? "Van / Hiace" : "3 Guests"}</option>
                  <option>{tab === 3 ? "Bus" : "4+ Guests"}</option>
                </select>
              </div>
              <div className="field">
                <label style={{ opacity: 0 }}>Go</label>
                <button type="submit" className="btn btn-green">
                  Enquire Now
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
