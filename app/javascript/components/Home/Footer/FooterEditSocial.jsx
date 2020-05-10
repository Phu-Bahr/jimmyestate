import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FooterEditSocial = props => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-3">
        <Link
          to={`//` + props.facebook}
          target="blank"
          className="c-magic-icon"
        >
          <div className="c-magic-icon__fill facebook">
            <FontAwesomeIcon
              icon={["fab", "facebook-f"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "facebook-f"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>

        <Link to={`//` + props.twitter} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill twitter">
            <FontAwesomeIcon
              icon={["fab", "linkedin-in"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "linkedin-in"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>

        <Link
          to={`//` + props.instagram}
          target="blank"
          className="c-magic-icon"
        >
          <div className="c-magic-icon__fill instagram">
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>

        <Link to={`//` + props.other} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill googleplus">
            <FontAwesomeIcon
              icon={["fab", "google-plus-g"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "google-plus-g"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>

        <Link to={`//` + props.zillow} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill zillow">
            <img
              style={{ height: "80%", filter: "invert(100%)" }}
              src="https://img.pngio.com/zillow-icon-png-91-images-in-collection-page-2-zillow-icon-png-512_512.png"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <img
              style={{ height: "80%", filter: "invert(100%)" }}
              src="https://img.pngio.com/zillow-icon-png-91-images-in-collection-page-2-zillow-icon-png-512_512.png"
            />
          </div>
        </Link>

        <Link to={`//` + props.realtor} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill realtor">
            <img
              style={{ height: "90%", filter: "invert(100%)" }}
              src="https://cdn3.iconfinder.com/data/icons/real-estate-glyph-8/100/Artboard_43-512.png"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <img
              style={{ height: "90%", filter: "invert(100%)" }}
              src="https://cdn3.iconfinder.com/data/icons/real-estate-glyph-8/100/Artboard_43-512.png"
            />
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default FooterEditSocial;
