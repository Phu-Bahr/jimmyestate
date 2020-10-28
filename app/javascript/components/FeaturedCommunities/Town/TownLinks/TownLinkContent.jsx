import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gaLinks } from "../../../Constants/GoogleAnalyticEvents";

const TownLinkContent = props => {
  let payload = {
    townlinkID: props.id,
    townlink: props.townlink,
    townlinkdescription: props.townlinkdescription
  };

  return (
    <Fragment>
      <a
        href={`//` + props.townlink}
        target="_blank"
        className="townlink-color"
        onClick={() =>
          gaLinks(`${props.townlinkdescription} from Town ${props.townName}`)
        }
      >
        <li>
          {props.admin && (
            <Fragment>
              <div className="townlink-icon">
                <FontAwesomeIcon
                  icon="trash-alt"
                  size="1x"
                  onClick={() => props.deleteEvent(props.id)}
                />
              </div>
              <div className="townlink-icon">
                <FontAwesomeIcon
                  icon="edit"
                  size="1x"
                  onClick={() => props.handleEdit(payload)}
                />
              </div>
            </Fragment>
          )}

          {props.townlinkdescription}
        </li>
      </a>
    </Fragment>
  );
};

export default TownLinkContent;
