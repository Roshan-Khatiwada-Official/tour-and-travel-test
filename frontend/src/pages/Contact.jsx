import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import { siteConfig } from "../data/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta("Contact Us", "Get in touch with Civil Alliance Tours & Travels — office location, phone, email and enquiry form.");

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let's Plan Your Trip" subtitle="Reach out and a local trip expert will get back to you within 24 hours." />
      <section className="content-page">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h2 style={{ marginTop: 0 }}>Send an Enquiry</h2>
              <ContactForm />
            </div>
            <div>
              <h2 style={{ marginTop: 0 }}>Office & Contact Info</h2>
              <ul>
                <li>📍 {siteConfig.address}</li>
                <li>📞 {siteConfig.phone1} / {siteConfig.phone2}</li>
                <li>✉️ {siteConfig.email}</li>
                <li>🕘 {siteConfig.hours}</li>
              </ul>
              <div className="map-embed">
                <iframe
                  title="Civil Alliance Tours & Travels office location"
                  src={siteConfig.mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p style={{ fontSize: "12px", color: "#7b8aa3", marginTop: "10px" }}>
                Map centered on Surkhet from the address on file — pin it to the exact office location once confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
