import React, { Component } from "react";
import RelocationPhotoForm from "./RelocationPhotoForm";
import RelocationPhotoTile from "./RelocationPhotoTile";
import AlertBox from "../../../../Constants/AlertComponent";
import {
  postFetch,
  deleteFetch,
  getFetch
} from "../../../../Constants/FetchComponent";

const urlPath = "relocation_photos";

class RelocationPhotoContainer extends Component {
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

  componentDidMount() {
    getFetch(urlPath, this.mountState);
  }

  componentDidUpdate() {
    this.state.refreshKey &&
      getFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  }

  render() {
    let photos = this.state.photoData.map(element => {
      let handleDelete = () => {
        this.setState({
          idForAlert: element.id
        });
        this.alertType("delete");
      };

      return (
        <RelocationPhotoTile
          key={element.id}
          photo={element.photo}
          handleDelete={handleDelete}
          hide={this.props.hide}
        />
      );
    });

    return (
      <React.Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteEvent}
        />

        <div className="card border-0 col-md-6">
          {this.props.hide && this.props.user.admin && (
            <RelocationPhotoForm
              hide={this.props.hide}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          )}

          {photos}
        </div>
      </React.Fragment>
    );
  }
}

export default RelocationPhotoContainer;
