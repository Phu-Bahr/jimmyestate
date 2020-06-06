import React from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";

const HelperLinks = props => {
  return (
    <div className="col-md-6 col-middle px-3 py-2">
      <Link to={`/${props.route}`}>
        <div className="card border-0">
          <div className="parent m-0">
            <div className="child particles">
              <img className="venueImage card-img-top" src={props.image} />
              <div className="venueTitle">{props.title}</div>
            </div>
          </div>
        </div>
      </Link>
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
