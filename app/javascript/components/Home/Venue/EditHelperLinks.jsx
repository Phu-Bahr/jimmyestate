import React, { Component } from "react";

class EditHelperLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      street: this.props.street,
      city: this.props.city,
      state: this.props.state,
      zip: this.props.zip,
      telephone: this.props.telephone,
      url: this.props.url,
      venue_image: this.props.venueImage
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/venues/update/${this.props.id}`;
    const {
      name,
      street,
      city,
      state,
      zip,
      telephone,
      url,
      venue_image
    } = this.state;

    const body = {
      name,
      street,
      city,
      state,
      zip,
      telephone,
      url,
      venue_image
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.props.toggleRefreshKey)
      .then(alert("Venue has been updated."))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className={"py-4" + " " + this.props.hideUpdate}>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-6 pt-2">
              <label htmlFor="venueName">Venue name</label>
              <input
                type="text"
                name="name"
                id="venueName"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>

            <div className="col-sm-6 pt-2">
              <label htmlFor="venueImage">Venue Image Link</label>
              <input
                type="text"
                name="venue_image"
                id="venueImage"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.venue_image}
              />
            </div>
          </div>

          <button type="submit" className="btn custom-button mt-3">
            Update Card
          </button>
        </form>
      </div>
    );
  }
}

export default EditHelperLinks;
