import React, { Fragment } from "react";

const FooterEditOffice = props => {
  return (
    <Fragment>
      <p className="d-flex justify-content-center">{props.name}</p>
      <p className="d-flex justify-content-center mt-n3">{props.street}</p>
      <p className="d-flex justify-content-center mt-n3">{props.citystate}</p>
    </Fragment>
  );
};

export default FooterEditOffice;
