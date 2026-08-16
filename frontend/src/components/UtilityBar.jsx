import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { siteConfig, whatsappLink } from "../data/siteConfig";

export default function UtilityBar() {
  return (
    <div className="util-bar">
      <div className="wrap">
        <div className="util-right">
          <a className="social-dot" href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a className="social-dot" href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="social-dot" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <a className="social-dot" href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon />
          </a>
          <Link className="btn btn-green" style={{ padding: "7px 18px", fontSize: "12.5px" }} to="/contact">
            Enquiry Now
          </Link>
        </div>
      </div>
    </div>
  );
}
