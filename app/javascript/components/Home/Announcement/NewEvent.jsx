import React, { Component } from "react";

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      date: "",
      time: "",
      flier: "",
      lat: "",
      lng: "",
      geoData: [],
      refreshKey: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.submit = this.submit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    let location = `${this.state.location}`;

    fetch(`/api/v1/events/search?location=${location}`)
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
        if (body.data[0].result === "No Results") {
          alert("No such place for geocode, try again");
        } else {
          alert("Geocode updated");
          this.setState({
            lat: body.data[0].lat,
            lng: body.data[0].lng
          });
        }
      })
      .then(setTimeout(this.submit, 1000))
      .catch(error => console.log("error message =>", error.message));
  }

  submit(event) {
    const urls = "/api/v1/events";
    const { title, location, date, time, flier, lat, lng } = this.state;

    const body = {
      title,
      location,
      date,
      time,
      flier,
      lat,
      lng
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
          alert("Event has been added");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.props.toggleRefreshKey)
      .then(
        this.setState({
          title: "",
          location: "",
          date: "",
          time: "",
          flier: "",
          lat: "",
          lng: ""
        })
      )
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <React.Fragment>
        <div className="px-3">
          <h4>Add new event here:</h4>
        </div>
        <div className="col-sm-12 col-lg-6 pb-4 container mx-auto">
          <form
            onSubmit={event => {
              this.onSubmit(event);
              event.target.reset();
            }}
          >
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="Name of Event"
            />
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="Address"
            />
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="Date"
            />
            <input
              type="time"
              name="time"
              id="time"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="Time"
            />
            <input
              type="text"
              name="flier"
              id="flier"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="Image URL"
            />
          </form>
          <button onClick={this.onSubmit} className="btn custom-button">
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NewEvent;

// fetch(
//   `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDQWRPFAqjRNQ1wXl8r3kL6nfZdmcYhk1U`
// )
