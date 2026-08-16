import PageHero from "../components/PageHero";
import InquiryForm from "../components/InquiryForm";
import { siteConfig, whatsappLink } from "../data/siteConfig";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Inquiry() {
  usePageMeta("Online Inquiry", "Send an online travel inquiry to Civil Alliance Tours & Travels — destination, dates, travelers, and preferred services.");

  return (
    <>
      <PageHero eyebrow="Online Inquiry" title="Tell Us About Your Trip" subtitle="No commitment — just tell us what you're planning and we'll follow up with options." crumbLabel="Inquiry" />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <InquiryForm />
          <p style={{ marginTop: "26px", fontSize: "13.5px", color: "#7b8aa3", textAlign: "center" }}>
            Prefer to talk directly? Call {siteConfig.phone1} or{" "}
            <a href={whatsappLink()} target="_blank" rel="noreferrer" style={{ color: "var(--green-dark)", fontWeight: 700 }}>
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
