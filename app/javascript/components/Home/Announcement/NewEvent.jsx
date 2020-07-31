import React, { Component } from "react";
import { getGeocode, postNoScrollFetch } from "../../Constants/FetchComponent";
import { AddButton } from "../../Constants/Buttons";

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
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  clearState = () => {
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

  mountLatLng = body => {
    this.setState({
      lat: body.data[0].lat,
      lng: body.data[0].lng
    });
  };

  onSubmit = () => {
    let location = `${this.state.location}`;

    if (Date.parse(this.ShowCurrentDate()) > Date.parse(this.state.date)) {
      alert("Please choose a current or future date!");
    } else {
      getGeocode(location, this.mountLatLng, this.props.alertType).then(
        setTimeout(this.submit, 700)
      );
    }
  };

  submit = () => {
    const url = `/api/v1/${this.props.urlPath}`;
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

    postNoScrollFetch(url, body, this.props.alertType)
      .then(this.clearState)
      .then(this.props.toggleRefreshKey);
  };

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
            <AddButton onClick={this.onSubmit} value="Create Event" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default NewEvent;
