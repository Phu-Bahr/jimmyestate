import React from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import { animateScroll as scroll } from "react-scroll";

const HelperLinks = props => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="col-md-6 col-middle px-3 py-2">
      <ScrollAnimation animateIn="fadeIn">
        <Link to={`/${props.route}`} onClick={scrollToTop}>
          <div className="card border-0">
            <div className="parent m-0">
              <div className="child particles">
                <img className="venueImage card-img-top" src={props.image} />
                <div className="venueTitle">{props.title}</div>
              </div>
            </div>
          </div>
        </Link>
      </ScrollAnimation>
      {props.user.admin ? (
        <EditHelperLinks
          key={props.id}
          id={props.id}
          image={props.image}
          title={props.title}
          route={props.route}
          hideUpdate={props.hideUpdate}
          handleClick={props.handleClick}
          toggleRefreshKey={props.toggleRefreshKey}
        />
      ) : null}
    </div>
  );
};

export default HelperLinks;
