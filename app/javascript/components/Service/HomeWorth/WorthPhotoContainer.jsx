import React, { Component, Fragment } from "react";
import { FadeInLeft } from "../../Constants/Constants";
import {
  postFetch,
  deleteFetch,
  getFetch
} from "../../Constants/FetchComponent";
import { DeleteButton, AddButton } from "../../Constants/Buttons";
import AlertBox from "../../Constants/AlertComponent";

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
      showAlert: false,
      idForAlert: null
    };
  }

  hidingAlert = () => this.setState({ showAlert: false });
  successfulDelete = () => this.setState({ typeOfAlert: "successDelete" });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const { photo } = this.state;
    const body = { photo };

    postFetch(url, token, body)
      .then(this.toggleRefreshKey)
      .then(event.target.reset())
      .catch(error => console.log("error message =>", error.message));
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const typeAlert = this.successfulDelete;

    deleteFetch(url, token, typeAlert)
      .then(this.setState({ typeOfAlert: "successDelete" }))
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
          showAlert: true,
          idForAlert: element.id
        });
      };

      return (
        <div className="pb-3" key={element.id}>
          <FadeInLeft>
            <div className="parent1 m-0">
              <div className="child1 particles">
                <img
                  className="portfolioImage card-img-top"
                  src={element.photo}
                />
              </div>
              {this.props.hide && (
                <div className="portfolioTitle">
                  <DeleteButton onClick={handleDelete} />
                </div>
              )}
            </div>
          </FadeInLeft>
        </div>
      );
    });

    return (
      <Fragment>
        {this.state.showAlert && (
          <AlertBox
            {...this.state}
            hidingAlert={this.hidingAlert}
            deleteEvent={this.deleteEvent}
          />
        )}
        <div className="card border-0 col-md-6">
          {this.props.hide && (
            <div className="pb-3">
              <form onSubmit={this.onSubmit}>
                <label htmlFor="photo">Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  className="form-control"
                  onChange={this.onChange}
                  required
                />
                <AddButton className="mt-3" value="Add Photo" />
              </form>
            </div>
          )}
          {photos}
        </div>
      </Fragment>
    );
  }
}

export default WorthPhotoContainer;

//help
