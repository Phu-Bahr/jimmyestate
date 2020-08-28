import React, { Component, Fragment } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import { SubmitEmailButton } from "../Constants/Buttons";
import { postFetchEmail } from "../Constants/FetchComponent";

const urlPath = "contacts";

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
  }

  onResolved = () =>
    console.log(
      "Recaptcha resolved with response: " + this.recaptcha.getResponse()
    );
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    this.recaptcha.execute();
    const url = `/api/v1/${urlPath}`;
    const { name, email, message } = this.state;
    const body = { name, email, message };

    postFetchEmail(url, body, this.props.alertType);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">
              Please tell me about your Real Estate Goals:
            </label>
            <textarea
              rows="5"
              type="text"
              name="message"
              id="message"
              className="form-control"
              onChange={this.onChange}
              placeholder="Message"
              required
            />
          </div>

          <SubmitEmailButton />

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

export default EmailForm;
