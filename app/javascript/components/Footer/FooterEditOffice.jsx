import React, { Fragment } from "react";

const FooterEditOffice = props => {
  return (
    <Fragment>
      <p className="footerAlignment">{props.name}</p>
      <p className="footerAlignment mt-n3">{props.street}</p>
      <p className="footerAlignment mt-n3">{props.citystate}</p>
    </Fragment>
  );
};

export default FooterEditOffice;
