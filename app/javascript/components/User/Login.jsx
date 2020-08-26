import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../Constants/AlertComponent";
import { loginFetch } from "../Constants/FetchComponent";
import { SubmitEmailButton } from "../Constants/Buttons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "guestADMIN@test.com",
      password: "sandbox",
      loginErrors: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  directToPath = () => {
    this.setState({ typeOfAlert: null });
    this.props.history.goBack();
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    const url = "/api/v1/sessions";
    const { email, password } = this.state;
    const body = { user: { email: email, password: password } };

    loginFetch(
      url,
      body,
      this.alertType,
      this.props.handleLogin,
      this.directToPath
    );
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
            <h1>Status: {this.props.loggedInStatus}</h1>
            <h2>
              Logged in as:
              {this.props.user.email == undefined
                ? " No User"
                : this.props.user.email}
            </h2>

            <form onSubmit={this.handleLoginSubmit}>
              <div className="form-group formWidth">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control text-center"
                  required
                />
              </div>

              <div className="form-group formWidth">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control text-center"
                  required
                />
              </div>

              <SubmitEmailButton value2="LOG IN" value1="Let's fix stuff" />
            </form>

            <div className="mt-3">
              <Link to="/">Back to Home page</Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
