import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TownLinkContent = props => {
  let payload = {
    townlinkID: props.id,
    townlink: props.townlink,
    townlinkdescription: props.townlinkdescription
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-6">
          <Link to={`//` + props.townlink} target="blank" className="link">
            <li>{props.townlinkdescription}</li>
          </Link>
        </div>
        {props.admin && (
          <Fragment>
            <div className="col-xs-4 px-5">
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
                onClick={() => props.deleteEvent(props.id)}
              />
            </div>
            <div className="col-xs-4">
              <FontAwesomeIcon
                icon="edit"
                size="1x"
                onClick={() => props.handleEdit(payload)}
              />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default TownLinkContent;
