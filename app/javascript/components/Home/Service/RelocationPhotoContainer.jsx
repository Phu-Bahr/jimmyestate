import React, { Component } from "react";
import { FadeInRight } from "../../Constants/Constants";

class RelocationPhotoContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      photoData: [],
      photo: ""
    };

    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.toggleRefreshKeyFalse = this.toggleRefreshKeyFalse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  toggleRefreshKeyFalse(event) {
    this.setState({ refreshKey: false });
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/relocation_photos";
    const { photo } = this.state;

    const body = {
      photo
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Property has been added.");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  deleteEvent(id) {
    const urls = `/api/v1/relocation_photos/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/relocation_photos")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        let newPhotoData = body;
        this.setState({
          photoData: newPhotoData,
          photo: newPhotoData[0].photo
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/relocation_photos")
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(response => response.json())
        .then(body => {
          let newPhotoData = body;
          this.setState({
            photoData: newPhotoData
          });
        })
        .then(this.toggleRefreshKeyFalse)
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
    console.log(this.props);

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
              <div className={"portfolioTitle" + " " + this.props.hide}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDelete}
                >
                  Delete Property
                </button>
              </div>
            </div>
          </FadeInRight>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="card border-0 col-md-6">
          <div className={"pb-3" + " " + this.props.hide}>
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
          {photos}
        </div>
      </React.Fragment>
    );
  }
}

export default RelocationPhotoContainer;
