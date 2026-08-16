// Central place to update contact details, social links and tracking IDs.
// TODO: replace socials with your real profile URLs — these are placeholders.
export const siteConfig = {
  companyName: "Civil Alliance",
  companyFullName: "Civil Alliance Tours & Travels",
  phone1: "+977 985-1234567",
  phone2: "+977 984-1234567",
  whatsappNumber: "9779851234567", // used for wa.me links — no + or spaces
  email: "info@civilalliancetravels.com",
  address: "Birendranagar-6, Surkhet, Karnali Province, Nepal",
  hours: "Sun–Sat, 9:00 AM – 6:00 PM",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Birendranagar,+Surkhet,+Nepal&output=embed",
  social: {
    facebook: "https://facebook.com/YOUR_PAGE", // TODO: replace with real URL
    instagram: "https://instagram.com/YOUR_HANDLE", // TODO: replace with real URL
    youtube: "https://youtube.com/@YOUR_CHANNEL", // TODO: replace with real URL
  },
  // TODO: replace with your real GA4 / Meta Pixel IDs, or leave blank to disable.
  analytics: {
    googleAnalyticsId: "",
    metaPixelId: "",
  },
  // TODO: fill in only the credentials you actually hold — leave the rest null.
  // The TrustBadges component only renders entries that are non-null, per the
  // "don't display certifications you don't hold" rule.
  trust: {
    panVat: null, // e.g. "PAN: 123456789"
    companyRegNumber: null, // e.g. "Company Reg. No. 123456/07/08"
    iata: null, // e.g. "IATA No. 12345678"
    natta: null, // e.g. "NATTA Membership No. 1234"
    taan: null, // e.g. "TAAN Membership No. 1234"
    googleRating: null, // e.g. 4.8 — only set once pulled from a real Google Business Profile
    googleReviewCount: null, // e.g. 62
    googleReviewsUrl: null, // link to the real Google Business Profile reviews page
  },
};

export const whatsappLink = (message = "Hi, I'd like to know more about your tour packages.") =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
