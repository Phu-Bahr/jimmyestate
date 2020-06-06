import React, { Component } from "react";

class EditHelperLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      title: "",
      route: "",
      id: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/helper_links/${this.state.id}`;
    const { image, title, route } = this.state;

    const body = {
      image,
      title,
      route
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
          alert("Card updated");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  render() {
    let form = this.props.data.map(element => {
      return (
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-12 pt-2">
              <label htmlFor="venueImage">Card Image Link</label>
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

            <div className="col-sm-6 pt-2">
              <label htmlFor="venueName">Card Title</label>
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
              <label htmlFor="venueImage">Route</label>
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
      );
    });
    return <div className="py-4">{form}</div>;
  }
}

export default EditHelperLinks;
