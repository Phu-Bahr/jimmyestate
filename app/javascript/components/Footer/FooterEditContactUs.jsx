import React from "react";

const FooterEditContactUs = props => {
  return (
    <div className="pb-3">
      <div className="d-flex justify-content-center">
        <a href={`tel:` + props.contact1} style={{ color: "black" }}>
          <div className="fa fa-phone pr-2" />
          {props.contact1}
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <a href={`mailto:` + props.contact2} style={{ color: "black" }}>
          <div className="fa fa-envelope pr-2" />
          {props.contact2}
        </a>
      </div>
      <div className="d-flex justify-content-center">{props.contact3}</div>
      <div className="d-flex justify-content-center">{props.contact4}</div>
    </div>
  );
};

export default FooterEditContactUs;
