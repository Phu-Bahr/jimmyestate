import React, { Component, Fragment } from "react";
import { SubmitEmailButton } from "../../../Constants/Buttons";
import Recaptcha from "react-google-invisible-recaptcha";
import { postFetchEmail } from "../../../Constants/FetchComponent";
import { MessageCounter } from "../../../Constants/Constants";

const urlEmailPath = "relocations";

class RelocationEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      time: "Anytime",
      destinationaddress: "",
      timeframe: "",
      assistsell: "Maybe",
      message: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onResolved = () =>
    console.log("Captcha response => ", this.recaptcha.getResponse());

  onSubmit = event => {
    event.preventDefault();
    this.recaptcha.execute();
    const url = `/api/v1/${urlEmailPath}`;
    const {
      name,
      email,
      phone,
      time,
      destinationaddress,
      timeframe,
      assistsell,
      message
    } = this.state;

    const body = {
      name,
      email,
      phone,
      time,
      destinationaddress,
      timeframe,
      assistsell,
      message
    };

    postFetchEmail(url, body, this.props.alertType);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-sm-12 col-md-12 col-lg-6">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={this.onChange}
                maxLength="30"
                required
              />
            </div>
            <div className="form-group col-sm-12 col-md-12 col-lg-6">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-12 col-md-12 col-lg-6">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                maxLength="16"
                name="phone"
                id="phone"
                className="form-control"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group col-sm-12 col-md-12 col-lg-6">
              <label htmlFor="time">Best time to reach you?</label>
              <select
                type="text"
                name="time"
                id="time"
                className="form-control"
                onChange={this.onChange}
                required
                value={this.state.time}
              >
                <option>Anytime</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="destinationaddress">Your Destination Address</label>
            <input
              type="text"
              name="destinationaddress"
              id="destinationaddress"
              className="form-control"
              onChange={this.onChange}
              maxLength="50"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-sm-12 col-md-12 col-lg-7">
              <label htmlFor="timeframe">Moving time frame?</label>
              <input
                type="text"
                name="timeframe"
                id="timeframe"
                className="form-control"
                onChange={this.onChange}
                maxLength="100"
              />
            </div>
            <div className="form-group col-sm-12 col-md-12 col-lg-5">
              <label htmlFor="assistsell">Need assistance selling?</label>
              <select
                type="text"
                name="assistsell"
                id="assistsell"
                className="form-control"
                onChange={this.onChange}
                required
                value={this.state.propertytype}
              >
                <option>Maybe</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              rows="5"
              type="text"
              name="message"
              id="message"
              className="form-control"
              onChange={this.onChange}
              required
              placeholder="Additional information you'd like to tell me."
            />
            <MessageCounter {...this.state} />
          </div>
          <SubmitEmailButton GAValue="Relocation Email Button" />
          <Recaptcha
            ref={ref => (this.recaptcha = ref)}
            sitekey="6LduIvAUAAAAANu_zPUXIWLmjk_L-ZWdJkAFJbx7"
            onResolved={this.onResolved}
          />
        </form>
      </Fragment>
    );
  }
}

export default RelocationEmailForm;
