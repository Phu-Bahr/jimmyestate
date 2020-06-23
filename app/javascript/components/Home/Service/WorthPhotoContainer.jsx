import React, { Component } from "react";
import { FadeInLeft } from "../../Constants/Constants";
import {
  postFetch,
  deleteFetch,
  getFetch
} from "../../Constants/FetchComponent";

class WorthPhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "worth_photos",
      photoData: [],
      photo: "",
      refreshKey: false
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.state.url}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const { photo } = this.state;
    const body = { photo };

    postFetch(url, token, body)
      .then(this.setState({ refreshKey: true }))
      .catch(error => console.log("error message =>", error.message));
  };

  deleteEvent = id => {
    const url = `/api/v1/${this.state.url}/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    deleteFetch(url, token)
      .then(this.setState({ refreshKey: true }))
      .catch(error => console.log("error message =>", error.message));
  };

  componentDidMount() {
    getFetch(this.state.url)
      .then(body => this.setState({ photoData: body }))
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    this.state.refreshKey
      ? getFetch(this.state.url)
          .then(body => this.setState({ photoData: body }))
          .then(this.setState({ refreshKey: false }))
          .catch(error => console.log("error message =>", error.message))
      : null;
  }

  render() {
    let photos = this.state.photoData.map(element => {
      let handleDelete = () => {
        let result = confirm(`Are you sure you want to delete this photo?`);
        result ? this.deleteEvent(element.id) : null;
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
              {this.props.hide ? (
                <div className="portfolioTitle">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDelete}
                  >
                    Delete Property
                  </button>
                </div>
              ) : null}
            </div>
          </FadeInLeft>
        </div>
      );
    });

    console.log(this.state);
    return (
      <React.Fragment>
        <div className="card border-0 col-md-6">
          {this.props.hide ? (
            <div className="pb-3">
              <form
                onSubmit={event => {
                  this.onSubmit(event);
                  event.target.reset();
                }}
              >
                <label htmlFor="photo">Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <button
                  className="btn btn-info mt-3"
                  onClick={this.onSubmitEdit}
                >
                  Add Photo
                </button>
              </form>
            </div>
          ) : null}
          {photos}
        </div>
      </React.Fragment>
    );
  }
}

export default WorthPhotoContainer;
