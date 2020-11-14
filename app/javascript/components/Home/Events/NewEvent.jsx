import React, { Component, Fragment } from "react";
import {
  getGeocodeEvent,
  postNoScrollFetch
} from "../../Constants/FetchComponent";
import { AddButton } from "../../Constants/Buttons";
import moment from "moment";

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
      refreshKey: false,
      timeEnd: "",
      link: null
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
      lng: "",
      timeEnd: "",
      link: ""
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
    event.preventDefault();
    let location = `${this.state.location}`;

    Date.parse(this.ShowCurrentDate()) > Date.parse(this.state.date)
      ? alert("Please choose a current or future date!")
      : this.state.timeEnd <= this.state.time
      ? alert("Ending time can not be before start time.")
      : getGeocodeEvent(location, this.mountLatLng, this.props.alertType);
  };

  submit = () => {
    const url = `/api/v1/${this.props.urlPath}`;
    const {
      title,
      location,
      date,
      time,
      flier,
      lat,
      lng,
      timeEnd,
      link
    } = this.state;

    const body = {
      title,
      location,
      date,
      time,
      flier,
      lat,
      lng,
      timeEnd,
      link
    };

    postNoScrollFetch(url, body, this.props.alertType)
      .then(this.clearState)
      .then(this.props.toggleRefreshKey);
  };

  render() {
    return (
      <Fragment>
        <div className="px-3">
          <header>
            <h2>Add new event here:</h2>
          </header>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 pb-4 container mx-auto">
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

            <div className="row pt-2">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 p-2">
                    <label htmlFor="link">Link</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      name="link"
                      id="link"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.link}
                      placeholder="Enter link of event here."
                      style={{ display: "inline-block" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 p-2">
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.date}
                      placeholder="Enter Date of event here."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-2">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 p-2">
                    <label htmlFor="time">Starting</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="time"
                      name="time"
                      id="time"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.time}
                      placeholder="Enter time of event here."
                      style={{ display: "inline-block" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 p-2">
                    <label htmlFor="timeEnd">Ending</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="time"
                      name="timeEnd"
                      id="timeEnd"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      value={this.state.timeEnd}
                      placeholder="Enter end time of event here."
                    />
                  </div>
                </div>
              </div>
            </div>

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
            <AddButton value="Create Event" className="mt-3" />
          </form>
        </div>
      </Fragment>
    );
  }
}

export default NewEvent;
