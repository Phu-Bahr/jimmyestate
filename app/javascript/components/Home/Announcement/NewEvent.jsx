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

  clearState = () => {
    console.log("triggered clearstate");

    this.setState({
      title: "",
      location: "",
      date: "",
      time: "",
      flier: "",
      lat: "",
      lng: ""
    });
  };

  ShowCurrentDate = () => {
    let date = ("0" + new Date().getDate()).slice(-2);
    let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    let year = new Date().getFullYear();

    return year + "-" + month + "-" + date;
  };

  onSubmit() {
    let location = `${this.state.location}`;

    if (Date.parse(this.ShowCurrentDate()) > Date.parse(this.state.date)) {
      alert("Please choose a current or future date!");
    } else {
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
        .then(setTimeout(this.submit, 700))
        .catch(error => console.log("error message =>", error.message));
    }
  }

  submit() {
    const url = "/api/v1/events";
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
          alert("Event has been added");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.clearState)
      .then(this.props.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <React.Fragment>
        <div className="px-3">
          <h4>Add new event here:</h4>
        </div>
        <div className="col-sm-12 col-lg-6 pb-4 container mx-auto">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              required
              onChange={this.onChange}
              value={this.state.title}
              placeholder="Name of Event"
            />
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              required
              onChange={this.onChange}
              value={this.state.location}
              placeholder="Location Address"
            />
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              required
              onChange={this.onChange}
              value={this.state.date}
            />
            <input
              type="time"
              name="time"
              id="time"
              className="form-control"
              required
              onChange={this.onChange}
              value={this.state.time}
            />
            <input
              type="text"
              name="flier"
              id="flier"
              className="form-control"
              required
              onChange={this.onChange}
              value={this.state.flier}
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
