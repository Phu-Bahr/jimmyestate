import React, { Component, Fragment } from "react";
import { SubmitEmailButton } from "../../../Constants/Buttons";
import Recaptcha from "react-google-invisible-recaptcha";
import { postFetchEmail } from "../../../Constants/FetchComponent";
import { MessageCounter } from "../../../Constants/Constants";

const urlPathForEmails = "home_worths";

class HomeWorthEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onResolved = () =>
    console.log("Captcha response => ", this.recaptcha.getResponse());

  onSubmit = event => {
    event.preventDefault();

    this.recaptcha.execute();
    const url = `/api/v1/${urlPathForEmails}`;
    const { name, email, phone, address, message } = this.state;
    const body = {
      name,
      email,
      phone,
      address,
      message
    };

    postFetchEmail(url, body, this.props.alertType).then(
      this.setState({ phone: "" })
    );
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
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

            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                maxLength="16"
                name="phone"
                id="phone"
                className="form-control"
                onChange={this.onChange}
                value={this.state.phone}
                maxLength="12"
                required
              />
            </div>
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="address">
              Full Address for Comparative Market Analysis
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="form-control"
              onChange={this.onChange}
              maxLength="50"
              required
            />
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
              maxLength="250"
              required
              placeholder="Please provide any additional questions or information."
            />
            <MessageCounter {...this.state} />
          </div>

          <SubmitEmailButton GAValue="Homeworth Email Button" />

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

export default HomeWorthEmailForm;
