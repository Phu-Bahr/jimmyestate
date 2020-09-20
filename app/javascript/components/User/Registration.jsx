import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../Constants/AlertComponent";
import { SubmitEmailButton } from "../Constants/Buttons";

const urlPath = "registrations";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  directToPath = () => {
    this.setState({ typeOfAlert: null });
    this.props.history.goBack();
  };

  handleRegSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const { email, password, password_confirmation } = this.state;

    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          this.setState({ typeOfAlert: "successRegistration" });
        } else {
          this.setState({ typeOfAlert: "error" });
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
  };

  componentDidMount = () => window.scrollTo(0, 0);

  render() {
    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          directToPath={this.directToPath}
        />

        <div className="loginWrapper">
          <div className="loginForm">
            <header>
              <h1>Register User Here</h1>
            </header>

            <form onSubmit={this.handleRegSubmit}>
              <div className="form-group formWidth">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group formWidth">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group formWidth">
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Password Confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  required
                  className="form-control"
                />
              </div>

              <SubmitEmailButton value2="Submit User" value1="Register" />
            </form>
            <div className="m-4">
              <Link to="/">Back to Home page</Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Registration;
