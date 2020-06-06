import React from "react";
import { Link } from "react-router-dom";

class NewVenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      telephone: "",
      url: "",
      venue_image: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/venues/create";
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
      method: "POST",
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
      .then(response => this.props.history.push("/"))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new venue to keep it lit!
            </h1>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="venueName">Venue name</label>
                <input
                  type="text"
                  name="name"
                  id="venueName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueStreet">Street</label>
                <input
                  type="text"
                  name="street"
                  id="venueStreet"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueCity">City</label>
                <input
                  type="text"
                  name="city"
                  id="venueCity"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueState">State</label>
                <input
                  type="text"
                  name="state"
                  id="venueState"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueZip">Zip</label>
                <input
                  type="text"
                  name="zip"
                  id="venueZip"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueTelephone">Telephone</label>
                <input
                  type="tel"
                  name="telephone"
                  id="venueTelephone"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueURL">Url</label>
                <input
                  type="text"
                  name="url"
                  id="venueURL"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="venueImage">Venue Image Link</label>
                <input
                  type="text"
                  name="venue_image"
                  id="venueImage"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Create Venue
              </button>

              <Link to="/" className="btn btn-link mt-3">
                Back to Home Page
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewVenue;
