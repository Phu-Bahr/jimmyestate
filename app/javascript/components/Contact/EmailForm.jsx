import React, { Component, Fragment } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import { SubmitEmailButton } from "../Constants/Buttons";
import { postFetchEmail } from "../Constants/FetchComponent";
import { MessageCounter, RecaptchaKey } from "../Constants/Constants";

const urlPath = "contacts";

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", message: "", errors: "", input: {} };
  }

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

  onResolved = () =>
    console.log(
      "Recaptcha resolved with response: " + this.recaptcha.getResponse()
    );

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();

    if (this.validate()) {
      this.recaptcha.execute();
      const url = `/api/v1/${urlPath}`;
      let email = this.state.input.email;
      const { name, message } = this.state;

      const body = { name, email, message };
      postFetchEmail(url, body, this.props.alertType).then(
        this.setState({ input: {} })
      );
    }
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
              maxLength="30"
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
              onChange={this.handleChange}
              value={this.state.input.email}
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
              maxLength="250"
              required
            />
            <MessageCounter {...this.state} />
          </div>

          <SubmitEmailButton GAValue="Contact Email Button" />

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

export default EmailForm;
