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
      url: "worth_photos",
      photoData: [],
      photo: "",
      refreshKey: false,
      typeOfAlert: null,
      idForAlert: null
    };
  }

  hidingAlert = () => this.setState({ typeOfAlert: null });
  successfulDelete = () => this.setState({ typeOfAlert: "successDelete" });
  successfulAdd = () => this.setState({ typeOfAlert: "successAdd" });
  errorAlert = () => this.setState({ typeOfAlert: "error" });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const { photo } = this.state;
    const body = { photo };

    postFetch(url, token, body, this.successfulAdd, this.errorAlert)
      .then(this.toggleRefreshKey)
      .then(event.target.reset())
      .catch(error => console.log("error message =>", error.message));
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    deleteFetch(url, token, this.successfulDelete, this.errorAlert)
      .then(this.toggleRefreshKey)
      .catch(error => console.log("error message =>", error.message));
  };

  componentDidMount() {
    getFetch(urlPath)
      .then(body => this.setState({ photoData: body }))
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    this.state.refreshKey &&
      getFetch(urlPath)
        .then(body => this.setState({ photoData: body }))
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log("error message =>", error.message));
  }

  render() {
    let photos = this.state.photoData.map(element => {
      let handleDelete = () => {
        this.setState({
          typeOfAlert: "delete",
          idForAlert: element.id
        });
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
        {this.state.typeOfAlert !== null && (
          <AlertBox
            {...this.state}
            hidingAlert={this.hidingAlert}
            deleteEvent={this.deleteEvent}
          />
        )}

        <div className="card border-0 col-md-6">
          {this.props.hide && (
            <WorthPhotoForm onChange={this.onChange} onSubmit={this.onSubmit} />
          )}
          {photos}
        </div>
      </Fragment>
    );
  }
}

export default WorthPhotoContainer;
