import PageHero from "../components/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";

// DRAFT — generic starting template, not legal advice. Have this reviewed
// (especially the cancellation percentages) before publishing.
export default function Terms() {
  usePageMeta("Terms & Conditions", "Booking terms, payment policy, and cancellation policy for Civil Alliance Tours & Travels.");

  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" crumbLabel="Terms & Conditions" subtitle="Booking terms and cancellation policy." />
      <section className="content-page">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <h2>Booking & Payment</h2>
          <p>
            A deposit is required to confirm any tour or trek booking, with the balance due before departure. Exact
            deposit amounts and due dates will be confirmed in your booking invoice.
          </p>

          <h2>Cancellation Policy</h2>
          <ul>
            <li>30+ days before departure: full refund minus a processing fee.</li>
            <li>15–29 days before departure: 50% refund.</li>
            <li>Less than 14 days before departure: non-refundable.</li>
          </ul>
          <p>These figures are a starting template — confirm and adjust to your actual policy before publishing.</p>

          <h2>Travel Insurance</h2>
          <p>
            Travel insurance covering trip cancellation, medical treatment, and high-altitude evacuation (for trekking
            packages) is required for all bookings and is the traveler's responsibility to arrange.
          </p>

          <h2>Liability</h2>
          <p>
            Civil Alliance Tours & Travels acts as an agent for third-party service providers (airlines, hotels, local
            transport). While we vet our partners carefully, we are not liable for circumstances beyond our reasonable
            control, including weather-related flight delays common on mountain routes.
          </p>
        </div>
      </section>
    </>
  );
}
