import React, { Component } from "react";
import { FadeInRight } from "../../Constants/Constants";
import {
  postFetch,
  deleteFetch,
  getFetch
} from "../../Constants/FetchComponent";

class RelocationPhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "relocation_photos",
      photoData: [],
      photo: ""
    };
  }

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  toggleRefreshKeyFalse = () => {
    this.setState({ refreshKey: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.state.url}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const { photo } = this.state;
    const body = {
      photo
    };

    postFetch(url, token, body)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  deleteEvent = id => {
    const url = `/api/v1/${this.state.url}/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    deleteFetch(url, token)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  mountState = body => {
    this.setState({
      photoData: body
    });
  };

  componentDidMount() {
    getFetch(this.state.url)
      .then(body => {
        this.mountState(body);
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey) {
      getFetch(this.state.url)
        .then(body => {
          this.mountState(body);
        })
        .then(this.toggleRefreshKeyFalse)
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
    console.log(this.state.photo);

    let photos = this.state.photoData.map(element => {
      let handleDelete = () => {
        let result = confirm(`Are you sure you want to delete this photo?`);
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      return (
        <div className="pb-3" key={element.id}>
          <FadeInRight>
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
          </FadeInRight>
        </div>
      );
    });

    let photoInput = (
      <React.Fragment>
        {this.props.hide ? (
          <div className="pb-3">
            {photoInput}
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
              <button className="btn btn-info mt-3" onClick={this.onSubmitEdit}>
                Add Photo
              </button>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div className="card border-0 col-md-6">
          {photoInput}
          {photos}
        </div>
      </React.Fragment>
    );
  }
}

export default RelocationPhotoContainer;
