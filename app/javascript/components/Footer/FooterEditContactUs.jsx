import React from "react";

const FooterEditContactUs = props => {
  return (
    <div>
      <p className="d-flex justify-content-center">
        <a href={`tel:` + props.contact1} style={{ color: "black" }}>
          <div className="fa fa-phone pr-2" />
          {props.contact1}
        </a>
      </p>
      <p className="d-flex justify-content-center mt-n3">
        <a href={`mailto:` + props.contact2} style={{ color: "black" }}>
          <div className="fa fa-envelope pr-2" />
          {props.contact2}
        </a>
      </p>
      <p className="d-flex justify-content-center mt-n3">{props.contact3}</p>
      <p className="d-flex justify-content-center mt-n3">{props.contact4}</p>
    </div>
  );
};

export default FooterEditContactUs;
