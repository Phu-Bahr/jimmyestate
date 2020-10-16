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
      message: "",
      input: {},
      errors: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onResolved = () =>
    console.log("Captcha response => ", this.recaptcha.getResponse());
  handleChange = event => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({ input });
  };

  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    this.setState({ errors: errors });

    return isValid;
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.validate()) {
      this.recaptcha.execute();
      const url = `/api/v1/${urlEmailPath}`;
      let email = this.state.input.email;
      const {
        name,
        phone,
        time,
        destinationaddress,
        timeframe,
        assistsell,
        message
      } = this.state;

      const body = {
        name,
        phone,
        time,
        destinationaddress,
        timeframe,
        assistsell,
        message
      };

      postFetchEmail(url, body, this.props.alertType).then(
        this.setState({ input: {} })
      );
    }
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
                type="text"
                name="email"
                id="email"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.input.email}
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
