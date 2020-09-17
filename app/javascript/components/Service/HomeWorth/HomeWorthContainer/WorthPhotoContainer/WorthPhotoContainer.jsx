import React, { Component, Fragment } from "react";
import {
  postFetch,
  deleteFetch,
  getFetch
} from "../../../../Constants/FetchComponent";
import AlertBox from "../../../../Constants/AlertComponent";
import WorthPhotoTile from "./WorthPhotoTile";
import WorthPhotoForm from "./WorthPhotoForm";

const urlPath = "worth_photos";

class WorthPhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: [],
      photo: "",
      refreshKey: false,
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const { photo } = this.state;
    const body = { photo };

    postFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    deleteFetch(url, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => this.setState({ photoData: body });

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    let photos = this.state.photoData.map(element => {
      let handleDelete = () => {
        this.setState({ idForAlert: element.id });
        this.alertType("delete");
      };

      return (
        <WorthPhotoTile
          key={element.id}
          photo={element.photo}
          handleDelete={handleDelete}
          hide={this.props.hide}
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

        <div className="card border-0 col-md-6">
          {this.props.user.admin && (
            <Fragment>
              {this.props.hide && (
                <WorthPhotoForm
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
              )}
            </Fragment>
          )}

          {photos}
        </div>
      </Fragment>
    );
  }
}

export default WorthPhotoContainer;
