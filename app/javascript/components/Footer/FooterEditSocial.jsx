import React, { Fragment } from "react";

const FooterEditSocial = props => {
  return (
    <Fragment>
      <div className="social-container">
        <h3 style={{ fontWeight: "900" }}>SOCIAL</h3>
        <ul className="social-icons">
          <li>
            <a href={`//` + props.facebook} target="_blank">
              <i className="fa fa-facebook"></i>
            </a>
          </li>

          <li>
            <a href={`//` + props.twitter} target="_blank">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>

          <li>
            <a href={`//` + props.instagram} target="_blank">
              <i className="fa fa-instagram"></i>
            </a>
          </li>

          <li>
            <a href={`//` + props.other} target="_blank">
              <img
                id="google-icon"
                src="https://www.freepngimg.com/thumb/google/66984-logo-search-google-my-business-free-transparent-image-hq.png"
                alt="google business icon"
              />
            </a>
          </li>

          <li>
            <a href={`//` + props.zillow} target="_blank">
              <img
                src="https://img.pngio.com/zillow-icon-png-91-images-in-collection-page-2-zillow-icon-png-512_512.png"
                alt="zillow icon"
              />
            </a>
          </li>

          <li>
            <a href={`//` + props.realtor} target="_blank">
              <img
                src="https://cdn3.iconfinder.com/data/icons/real-estate-glyph-8/100/Artboard_43-512.png"
                alt="realtor house icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default FooterEditSocial;
