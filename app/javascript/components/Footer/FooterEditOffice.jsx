import React from "react";

const FooterEditOffice = props => {
  return (
    <section>
      <p className="footerAlignment">{props.name}</p>
      <p className="footerAlignment mt-n3">{props.street}</p>
      <p className="footerAlignment mt-n3">{props.citystate}</p>
      <figure className="office-icons">
        <figure className="office-icons__icon-2">
          <img
            src="https://ik.imagekit.io/YourAgentJimmy/equal-housing-opportunity-logo-1200w_rqAlXuSLIV.png"
            alt=""
            className="office-icons__image"
          />
        </figure>
        <figure className="office-icons__icon-1">
          <img
            src="https://ik.imagekit.io/YourAgentJimmy/office_R_blk_waCdS28ty.png"
            alt=""
            className="office-icons__image"
          />
        </figure>
      </figure>
    </section>
  );
};

export default FooterEditOffice;
