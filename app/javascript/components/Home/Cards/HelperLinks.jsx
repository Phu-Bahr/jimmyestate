import React from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import { gaCards } from "../../Constants/GoogleAnalyticEvents";

const HelperLinks = props => {
  return (
    <div className="col-md-12 col-lg-6 col-middle px-4 py-3">
      <ScrollAnimation animateIn="fadeIn">
        <Link
          to={`/${props.route}`}
          onClick={() => gaCards(`${props.title} Card`)}
        >
          <div className="card border-0 helper-card imageShadow">
            <div className="parent m-0">
              <figure className="child particles">
                <img
                  className="cardImage card-img-top"
                  src={props.image}
                  alt={`helper card image ` + props.id}
                />
                <figcaption className="cardTitle px-3 py-1">
                  {props.title}
                </figcaption>
              </figure>
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
