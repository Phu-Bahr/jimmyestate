import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFetch, deleteFetch } from "../Constants/FetchComponent";
import { gaNavLinks } from "../Constants/GoogleAnalyticEvents";

const urlPath = "partner_categories";
const editUrlPath = "edit-partner-category";

class PartnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerData: [],
      refreshKey: false
    };
  }
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  mountState = body => this.setState({ partnerData: body });
  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;

    deleteFetch(url, this.props.alertType)
      .then(this.toggleRefreshKey)
      .then(this.props.history.push("/"));
  };

  render() {
    let admin = this.props.user.admin;
    let partnerCategories = this.state.partnerData.map(element => {
      return (
        <Fragment key={element.id}>
          <div
            className={admin && "dropdown-item"}
            onClick={() => gaNavLinks(element.name)}
          >
            <div className={admin ? "navbar-underline py-2" : "container py-1"}>
              <Link
                to={`/${urlPath}/${element.id}`}
                className={admin ? "" : "dropdown-item navbar-underline"}
                style={admin && { fontSize: "13px" }}
              >
                {element.name}
              </Link>

              {admin && (
                <div className="float-right">
                  <div
                    className="px-1"
                    style={{ display: "inline-block", cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon="trash-alt"
                      size="2x"
                      onClick={() => this.deleteEvent(element.id)}
                    />
                  </div>
                  <div className="px-1" style={{ display: "inline-block" }}>
                    <Link to={`/${editUrlPath}/${element.id}`}>
                      <FontAwesomeIcon icon="edit" size="2x" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      );
    });

    return <div>{partnerCategories}</div>;
  }
}

export default withRouter(PartnerList);
