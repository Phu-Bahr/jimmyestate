import React from "react";
import { gaSocialLinks } from "../Constants/GoogleAnalyticEvents";

const FooterEditSocial = props => {
  return (
    <section>
      <div className="social-container">
        <header>
          <h1>SOCIAL</h1>
        </header>
        <ul className="social-icons">
          <li>
            <a
              href={`//` + props.facebook}
              target="_blank"
              onClick={() => gaSocialLinks("Facebook")}
            >
              <i className="fa fa-facebook"></i>
            </a>
          </li>

          <li>
            <a
              href={`//` + props.twitter}
              target="_blank"
              onClick={() => gaSocialLinks("Linked In")}
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </li>

          <li>
            <a
              href={`//` + props.instagram}
              target="_blank"
              onClick={() => gaSocialLinks("Instagram")}
            >
              <i className="fa fa-instagram"></i>
            </a>
          </li>

          <li>
            <a
              href={`//` + props.other}
              target="_blank"
              onClick={() => gaSocialLinks("Google Business")}
            >
              <img
                id="google-icon"
                src="https://www.freepngimg.com/thumb/google/66984-logo-search-google-my-business-free-transparent-image-hq.png"
                alt="google business icon"
              />
            </a>
          </li>

          <li>
            <a
              href={`//` + props.zillow}
              target="_blank"
              onClick={() => gaSocialLinks("Zillow")}
            >
              <img
                src="https://img.pngio.com/zillow-icon-png-91-images-in-collection-page-2-zillow-icon-png-512_512.png"
                alt="zillow icon"
              />
            </a>
          </li>

          <li>
            <a
              href={`//` + props.realtor}
              target="_blank"
              onClick={() => gaSocialLinks("Realtor")}
            >
              <img
                src="https://cdn3.iconfinder.com/data/icons/real-estate-glyph-8/100/Artboard_43-512.png"
                alt="realtor house icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FooterEditSocial;
