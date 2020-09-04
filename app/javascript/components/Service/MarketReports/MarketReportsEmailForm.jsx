import React, { Component } from "react";
import { SubmitEmailButton } from "../../Constants/Buttons";
import Recaptcha from "react-google-invisible-recaptcha";
import { postFetchEmail } from "../../Constants/FetchComponent";

const urlEmailPath = "market_reports";

class MarketReportsEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      destinationaddress: "",
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
    const { name, email, phone, destinationaddress, message } = this.state;
    const body = {
      name,
      email,
      phone,
      destinationaddress,
      message
    };

    postFetchEmail(url, body, this.props.alertType);
  };

  render() {
    return (
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
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
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
          <label htmlFor="destinationaddress">
            Town/Neighborhood of Interest
          </label>
          <input
            type="text"
            name="destinationaddress"
            id="destinationaddress"
            className="form-control"
            onChange={this.onChange}
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
            required
            placeholder="Please provide any additional questions or information."
          />
        </div>
        <SubmitEmailButton GAValue="Market Report Email Button" />
        <Recaptcha
          ref={ref => (this.recaptcha = ref)}
          sitekey="6LduIvAUAAAAANu_zPUXIWLmjk_L-ZWdJkAFJbx7"
          onResolved={this.onResolved}
        />
      </form>
    );
  }
}

export default MarketReportsEmailForm;
