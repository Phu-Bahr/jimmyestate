import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterEditSocial = props => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-3">
        <a
          href={`//` + props.facebook}
          target="_blank"
          className="c-magic-icon"
        >
          <div className="c-magic-icon__fill facebook"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "facebook-f"]}
              className="iconfont mt-2"
            />
          </div>
        </a>

        <a href={`//` + props.twitter} target="_blank" className="c-magic-icon">
          <div className="c-magic-icon__fill twitter"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "linkedin-in"]}
              className="iconfont mt-2"
            />
          </div>
        </a>

        <a
          href={`//` + props.instagram}
          target="_blank"
          className="c-magic-icon"
        >
          <div className="c-magic-icon__fill instagram"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="iconfont mt-2"
            />
          </div>
        </a>

        <a href={`//` + props.other} target="_blank" className="c-magic-icon">
          <div className="c-magic-icon__fill googleplus"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <img
              className="google-icon-color"
              style={{ height: "80%" }}
              src="https://www.freepngimg.com/thumb/google/66984-logo-search-google-my-business-free-transparent-image-hq.png"
            />
          </div>
        </a>

        <a href={`//` + props.zillow} target="_blank" className="c-magic-icon">
          <div className="c-magic-icon__fill zillow"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <img
              style={{ height: "80%", filter: "invert(100%)" }}
              src="https://img.pngio.com/zillow-icon-png-91-images-in-collection-page-2-zillow-icon-png-512_512.png"
            />
          </div>
        </a>

        <a href={`//` + props.realtor} target="_blank" className="c-magic-icon">
          <div className="c-magic-icon__fill realtor"></div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <img
              style={{ height: "90%", filter: "invert(100%)" }}
              src="https://cdn3.iconfinder.com/data/icons/real-estate-glyph-8/100/Artboard_43-512.png"
            />
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default FooterEditSocial;
