import React from "react";
import { Link } from "react-router-dom";
import EditVenue from "./EditVenue";

const VenueTile = props => {
  return (
    <div className="col-md-6 col-middle px-3 py-2">
      <div className="card border-0">
        <div className="parent m-0">
          <div className="child particles">
            <img className="venueImage card-img-top" src={props.venueImage} />
            <div className="venueTitle" onClick={props.clickHideUpdate}>
              {props.name}
            </div>
          </div>
        </div>
        <div className={"card-body venueDetails" + " " + props.hideUpdate}>
          <div style={{ fontWeight: "900" }}>{props.name}</div>
          <div>{props.street}</div>
          <div>
            {props.city}, {props.state} {props.zip}
          </div>
          <div>{props.telephone}</div>
          <div>{props.url}</div>
        </div>
      </div>
      <div className="">
        <div className={"pt-2" + " " + props.hideEditButton}>
          <button
            type="button"
            className="btn btn-info"
            onClick={props.clickHideUpdate}
          >
            Edit
          </button>

          <EditVenue
            key={props.id}
            id={props.id}
            name={props.name}
            street={props.street}
            city={props.city}
            state={props.state}
            zip={props.zip}
            telephone={props.telephone}
            url={props.url}
            venueImage={props.venueImage}
            hideUpdate={props.hideUpdate}
            handleClick={props.handleClick}
            toggleRefreshKey={props.toggleRefreshKey}
          />
        </div>
      </div>
    </div>
  );
};

export default VenueTile;
