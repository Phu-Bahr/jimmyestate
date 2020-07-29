import React from "react";

const FooterEditContactUs = props => {
  return (
    <div>
      <p className="d-flex justify-content-center">
        <a href={`tel:` + props.contact1}>{props.contact1}</a>
      </p>
      <p className="d-flex justify-content-center mt-n3">{props.contact2}</p>
      <p className="d-flex justify-content-center mt-n3">{props.contact3}</p>
      <p className="d-flex justify-content-center mt-n3">{props.contact4}</p>
    </div>
  );
};

export default FooterEditContactUs;
