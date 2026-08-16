import { WhatsAppIcon } from "./Icons";
import { whatsappLink } from "../data/siteConfig";

export default function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
