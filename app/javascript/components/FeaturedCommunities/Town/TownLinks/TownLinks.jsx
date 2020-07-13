import React, { Component, Fragment } from "react";
import AlertBox from "../../../Constants/AlertComponent";
import {
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from "../../../Constants/FetchComponent";
import TownLinkForm from "./TownLinkForm";
import TownLinkContent from "./TownLinkContent";

const urlPath = "towns";
class TownLinks extends Component {
  constructor() {
    super();
    this.state = {
      townLinkData: [],
      id: "",
      townlink: "",
      townlinkdescription: "",
      refreshKey: false,
      townlinkID: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  clearForm = () => {
    this.setState({
      townlink: "",
      townlinkdescription: "",
      townlinkID: ""
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.props.paramID}/town_links`;
    const { townlink, townlinkdescription } = this.state;
    const body = { townlink, townlinkdescription };

    postFetch(url, body, this.alertType)
      .then(this.clearForm)
      .then(this.toggleRefreshKey);
  };

  onSubmitEdit = event => {
    if (this.state.townlinkID === "") {
      alert("Nothing to edit");
    } else {
      event.preventDefault();
      const url = `/api/v1/${urlPath}/${this.props.paramID}/town_links/${this.state.townlinkID}`;
      const { townlink, townlinkdescription, townlinkID } = this.state;
      const body = { townlink, townlinkdescription, townlinkID };

      putFetch(url, body, this.alertType)
        .then(this.clearForm)
        .then(this.toggleRefreshKey);
    }
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${this.props.paramID}/town_links/${id}`;
    deleteFetch(url, this.alertType)
      .then(this.toggleRefreshKey)
      .then(this.clearForm);
  };

  mountState = body => {
    body.length == 0
      ? this.setState({ townLinkData: body, id: this.props.paramID })
      : this.setState({ townLinkData: body, id: body[0].town_id });
  };

  componentDidMount = () => {
    let url = `${urlPath}/${this.props.paramID}/town_links`;
    getFetch(url, this.mountState);
  };

  updateState = body => {
    body.length == 0
      ? this.setState({
          townLinkData: body,
          id: this.props.paramID,
          refreshKey: false
        })
      : this.setState({
          townLinkData: body,
          id: body[0].town_id,
          refreshKey: false
        });
  };

  componentDidUpdate() {
    let url = `${urlPath}/${this.props.paramID}/town_links`;
    this.state.id != this.props.paramID
      ? getFetch(url, this.updateState)
      : this.state.refreshKey
      ? getFetch(url, this.updateState)
      : null;
  }

  handleEdit = body => {
    this.setState({
      townlinkID: body.townlinkID,
      townlink: body.townlink,
      townlinkdescription: body.townlinkdescription
    });
  };

  render() {
    let admin = this.props.user.admin;

    let displayLinks = this.state.townLinkData.map(element => {
      return (
        <TownLinkContent
          key={element.id}
          townlinkdescription={element.townlinkdescription}
          townlink={element.townlink}
          admin={admin}
          deleteEvent={this.deleteEvent}
          handleEdit={this.handleEdit}
          id={element.id}
        />
      );
    });

    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteEvent}
        />

        {this.state.townLinkData.length !== 0 && <div>{displayLinks}</div>}

        {admin && (
          <TownLinkForm
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onSubmitEdit={this.onSubmitEdit}
            {...this.state}
          />
        )}
      </Fragment>
    );
  }
}

export default TownLinks;
