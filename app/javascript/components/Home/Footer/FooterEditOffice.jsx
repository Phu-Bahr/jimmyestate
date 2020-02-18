import React from "react";

const FooterEditOffice = props => {
  return (
    <div>
      <p className="d-flex justify-content-center">{props.name}</p>
      <p className="d-flex justify-content-center mt-n3">{props.street}</p>
      <p className="d-flex justify-content-center mt-n3">{props.citystate}</p>
    </div>
  );
};

export default FooterEditOffice;
