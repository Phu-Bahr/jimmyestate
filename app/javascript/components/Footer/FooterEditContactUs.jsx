import React from "react";
import { gaContactLinks } from "../Constants/GoogleAnalyticEvents";

const FooterEditContactUs = props => {
  return (
    <div className="pb-3">
      <div className="footerAlignment">
        <a
          href={`tel:` + props.contact1}
          style={{ color: "black" }}
          onClick={() => gaContactLinks("Phone Footer")}
        >
          <div className="fa fa-phone pr-2 contact-icons" />
          {props.contact1}
        </a>
      </div>
      <div className="footerAlignment">
        <a
          href={`mailto:` + props.contact2}
          style={{ color: "black" }}
          onClick={() => gaContactLinks("Email Footer")}
        >
          <div className="fa fa-envelope pr-2 contact-icons" />
          {props.contact2}
        </a>
      </div>
      <div className="footerAlignment">{props.contact3}</div>
      <div className="footerAlignment">{props.contact4}</div>
    </div>
  );
};

export default FooterEditContactUs;
