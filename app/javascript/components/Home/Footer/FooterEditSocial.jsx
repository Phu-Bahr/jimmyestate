import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FooterEditSocial = props => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <Link to={props.facebook} target="blank" className="c-magic-icon">
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

        <Link to={props.twitter} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill twitter">
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>

        <Link to={props.instagram} target="blank" className="c-magic-icon">
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

        <Link to={props.other} target="blank" className="c-magic-icon">
          <div className="c-magic-icon__fill other">
            <FontAwesomeIcon
              icon={["fab", "google"]}
              className="iconfont mt-2"
            />
          </div>
          <div className="c-magic-icon__curtain"></div>
          <div className="c-magic-icon__outline">
            <FontAwesomeIcon
              icon={["fab", "google"]}
              className="iconfont mt-2"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FooterEditSocial;
