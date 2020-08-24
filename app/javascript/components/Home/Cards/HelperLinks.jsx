import React from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";

const HelperLinks = props => {
  return (
    <div className="col-md-6 col-middle px-4 py-3">
      <ScrollAnimation animateIn="fadeIn">
        <Link to={`/${props.route}`}>
          <div className="card border-0 helper-card">
            <div className="parent m-0">
              <div className="child particles">
                <img
                  className="venueImage card-img-top"
                  src={props.image}
                  alt={`helper card image ` + props.id}
                />
                <div className="venueTitle">{props.title}</div>
              </div>
            </div>
          </div>
        </Link>
      </ScrollAnimation>
      {props.user.admin && (
        <EditHelperLinks
          key={props.id}
          id={props.id}
          image={props.image}
          title={props.title}
          route={props.route}
          hideUpdate={props.hideUpdate}
          handleClick={() => props.handleClick(props.id)}
          toggleRefreshKey={props.toggleRefreshKey}
          alertType={props.alertType}
          urlPath={props.urlPath}
        />
      )}
    </div>
  );
};

export default HelperLinks;
