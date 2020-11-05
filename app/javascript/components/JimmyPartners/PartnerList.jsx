import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gaNavLinks } from "../Constants/GoogleAnalyticEvents";

const urlPath = "partner_categories";
const editUrlPath = "edit-partner-category";
const urlPathPartnerAlias = "preferred-services";

class PartnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let admin = this.props.user.admin;
    let partnerCategories = this.props.partnerData.map(element => {
      return (
        <Fragment key={element.id}>
          <div
            className={admin ? "dropdown-item px-3" : ""}
            onClick={() => gaNavLinks(element.name)}
          >
            <div className={admin ? "navbar-underline py-2" : "py-1"}>
              {admin && (
                <div className="float-left">
                  <div
                    className="px-1"
                    style={{ display: "inline-block", cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon="trash-alt"
                      size="2x"
                      onClick={() =>
                        this.props.handleDelete(
                          element.id,
                          "partner_categories"
                        )
                      }
                    />
                  </div>
                  <div className="px-1" style={{ display: "inline-block" }}>
                    <Link to={`/${editUrlPath}/${element.id}`}>
                      <FontAwesomeIcon icon="edit" size="2x" />
                    </Link>
                  </div>
                </div>
              )}
              <div className={admin ? "ellipsis" : "ellipsis container"}>
                <Link
                  to={`/${urlPathPartnerAlias}/${element.id}`}
                  className={admin ? "" : "dropdown-item navbar-underline"}
                  style={admin ? { fontSize: "13px" } : { fontSize: "" }}
                >
                  {element.name}
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      );
    });

    return <Fragment>{partnerCategories}</Fragment>;
  }
}

export default withRouter(PartnerList);
