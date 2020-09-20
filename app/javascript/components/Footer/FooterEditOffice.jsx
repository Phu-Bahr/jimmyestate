import React from "react";

const FooterEditOffice = props => {
  return (
    <section>
      <p className="footerAlignment">{props.name}</p>
      <p className="footerAlignment mt-n3">{props.street}</p>
      <p className="footerAlignment mt-n3">{props.citystate}</p>
    </section>
  );
};

export default FooterEditOffice;
