import React from "react";

const FooterEditContactUs = props => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <a href={`tel:` + props.contact1} style={{ color: "black" }}>
          <div className="fa fa-phone pr-2" />
          {props.contact1}
        </a>
      </div>
      <div className="d-flex justify-content-center mt-n3">
        <a href={`mailto:` + props.contact2} style={{ color: "black" }}>
          <div className="fa fa-envelope pr-2" />
          {props.contact2}
        </a>
      </div>
      <div className="d-flex justify-content-center mt-n3">
        {props.contact3}
      </div>
      <div className="d-flex justify-content-center mt-n3">
        {props.contact4}
      </div>
    </div>
  );
};

export default FooterEditContactUs;
