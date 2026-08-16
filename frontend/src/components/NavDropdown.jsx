import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Shared dropdown used by the Services, Explore and Account menus in the
// navbar — one implementation instead of three copies.
// `as="li"` when it lives inside the <ul class="nav-links">, `as="div"`
// when it stands alone (e.g. the account menu in the CTA area) — using an
// <li> outside a <ul> would pick up a stray bullet marker since it wouldn't
// inherit the `ul { list-style: none }` rule.
//
// Opens on hover, with a short close delay: the menu sits a few pixels
// below the trigger with a gap for visual breathing room, and that gap
// isn't covered by any element, so a naive mouseleave-closes-instantly
// approach fires while the pointer is still crossing that gap. The delay
// gives the pointer time to land on the menu (which cancels the pending
// close) before it actually disappears. Click still toggles it too, for
// touch devices and keyboard users where hover doesn't apply.
const CLOSE_DELAY_MS = 200;

export default function NavDropdown({ label, items, className = "", as: Tag = "li" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <Tag className={`nav-dropdown ${className}`} ref={ref} onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        className="nav-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label} <span className="chev" aria-hidden="true">▾</span>
      </button>
      <ul className={`nav-dropdown-menu${open ? " open" : ""}`}>
        {items.map((item) =>
          item.onClick ? (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
              >
                {item.label}
              </button>
            </li>
          ) : (
            <li key={item.label}>
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </Tag>
  );
}
