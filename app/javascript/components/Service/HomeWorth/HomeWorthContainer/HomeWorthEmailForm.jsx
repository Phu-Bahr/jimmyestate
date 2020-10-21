import React, { Component, Fragment } from "react";
import { SubmitEmailButton } from "../../../Constants/Buttons";
import Recaptcha from "react-google-invisible-recaptcha";
import { postFetchEmail } from "../../../Constants/FetchComponent";
import { MessageCounter, RecaptchaKey } from "../../../Constants/Constants";

const urlPathForEmails = "home_worths";

class HomeWorthEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
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
    this.setState({ input: input, errors: "" });
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
      const url = `/api/v1/${urlPathForEmails}`;
      let email = this.state.input.email;
      const { name, phone, address, message } = this.state;

      const body = {
        name,
        email,
        phone,
        address,
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
              type="text"
              name="email"
              id="email"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.input.email}
              required
            />
            <div className="text-danger">{this.state.errors.email}</div>
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
            sitekey={RecaptchaKey}
            onResolved={this.onResolved}
          />
        </form>
      </Fragment>
    );
  }
}

export default HomeWorthEmailForm;
