import React, { Component, Fragment } from "react";
import { EditButton } from "../../Constants/Buttons";

class NewHelperCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      titel: "",
      route: "",
      hideDiv: false
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onEditClick = () => this.setState({ hideDiv: !this.state.hideDiv });

  onSubmit = event => {
    event.preventDefault();
    const url = "/api/v1/helper_links";
    const { image, title, route } = this.state;

    const body = {
      image,
      title,
      route
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("New card created");
          return response.json();
        }
        alert("something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.props.toggleRefreshKey())
      .catch(error => console.log(error.message));
  };

  render() {
    return (
      <Fragment>
        <EditButton value="Add New Card" onClick={this.onEditClick} />
        {this.state.hideDiv && (
          <div className="container mb-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h4 className="col text-center">Add New Card</h4>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="route">Route</label>
                    <input
                      type="text"
                      name="route"
                      id="route"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>

                  <button type="submit" className="btn custom-button mt-3">
                    Create Card
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default NewHelperCard;
