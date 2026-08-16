# Civil Alliance Tours & Travels — Website

A multi-page React site (Vite + React Router) rebuilt from the original single-page HTML/CSS/JS site.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # to test the production build locally
```

The build output goes to `dist/` — upload that folder's contents to your web host.

## What's done (Phase 1)

- Real multi-page routing with React Router: `/`, `/about`, `/services`, `/packages`,
  `/packages/:id`, `/destinations`, `/gallery`, `/blog`, `/blog/:id`, `/contact`,
  `/faq`, `/privacy-policy`, `/terms-and-conditions`, plus a custom 404.
- Componentized: `Navbar`, `UtilityBar`, `MobileDrawer`, `Footer`, `Hero`, `PackageCard`,
  `TestimonialSlider`, `ContactForm`, `PageHero`, `CookieConsent`, `WhatsAppFloat`.
- Utility bar limited to social icons + "Enquiry Now" — phone/email/address moved to
  the Footer and the Contact page.
- Real SVG social icons (Facebook, Instagram, WhatsApp, YouTube) with working `wa.me` links.
- Your real logo is wired into the header, footer, and favicon (`public/logo-mark.png`,
  `public/logo-full.png`, `public/favicon*.png`).
- A working enquiry/contact form (name, email, phone, package interest, message) —
  currently submits via `mailto:` so it works with zero backend.
- Individual package detail pages with itinerary, inclusions/exclusions, price
  breakdown, gallery slot, and a booking form.
- `robots.txt` and `sitemap.xml`, meta description + Open Graph/Twitter tags,
  per-page `<title>`/description updates via `usePageMeta`.
- FAQ page (visa, permits, altitude sickness, best season), Privacy Policy, and
  Terms & Conditions / Cancellation Policy pages (draft legal text — have a
  lawyer review before publishing).
- Three genuinely-written blog posts (not placeholder lorem ipsum).

## What's still open (search the code for `TODO`)

1. **Real trip/location photos.** Every image slot (hero, package cards, destinations,
   gallery, testimonials, blog) is currently a placeholder mountain-style SVG
   (`src/components/Icons.jsx` → `MountainPlaceholder`). Once you send real photos,
   drop them in `public/images/` and update the `photo` field in
   `src/data/packages.js`, `src/data/testimonials.js`, `src/data/blogPosts.js`,
   and the `PackageCard`/`Gallery`/`Destinations` components.
2. **Real social profile URLs.** `src/data/siteConfig.js` has placeholder Facebook/
   Instagram/YouTube links — swap in your real ones.
3. **About Us content & guide bios.** `src/pages/About.jsx` has draft copy in your
   voice, but it's not your real story — replace it.
4. **Color palette picker.** Only the current navy/orange/green palette is built.
   Add a teal/gold and deep-green/sand variant as CSS custom-property swaps in
   `src/styles/global.css` (the `:root` variables) and a small toggle UI.
5. **Stronger animation layer.** Scroll reveal is already wired via
   `src/hooks/useReveal.js` (respects `prefers-reduced-motion`). Framer Motion/GSAP
   parallax and 3D tilt hover effects on cards haven't been added yet.
6. **Auto-scrolling marquee** exists for the partners strip on the homepage; a
   similar continuous photo carousel for Gallery/featured-destinations still needs
   real photos before it's worth building.
7. **Analytics & trust badges.** `src/data/siteConfig.js` has empty GA4/Meta Pixel
   ID fields — add real IDs to enable tracking. Trust badges (Nepal Tourism Board /
   TAAN / government license) are still emoji-based; swap for real badge images.
8. **Google Reviews / TripAdvisor widget** — still using the hardcoded testimonial
   slider; needs your real profile ID/embed once you choose a provider.
9. **Newsletter backend.** The footer form collects an email and shows a success
   message but isn't connected to a real email service yet.
10. **Contact form backend.** Currently uses `mailto:` — swap for a real endpoint
    (Formspree, a serverless function, etc.) so submissions don't depend on the
    visitor's email client.

## Project structure

```
src/
  components/   Navbar, Footer, Hero, PackageCard, ContactForm, etc.
  pages/        One file per route
  data/         packages.js, testimonials.js, blogPosts.js, content.js, siteConfig.js
  hooks/        useReveal (scroll animations), usePageMeta (SEO)
  styles/       global.css
public/
  logo-mark.png, logo-full.png, favicon*.png
  robots.txt, sitemap.xml
```
