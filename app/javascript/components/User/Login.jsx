import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../Constants/AlertComponent";
import { loginFetch } from "../Constants/FetchComponent";
import { SubmitEmailButton } from "../Constants/Buttons";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  render() {
    return (
      <React.Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          directToPath={this.directToPath}
        />
        <div
          className="parallaxStyleRoutes"
          style={{
            backgroundImage:
              "url(" +
              "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" +
              ")"
          }}
        />

        <div className="flex-container">
          <div className="container text-center my-5">
            <div>
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1>Status: {this.props.loggedInStatus}</h1>
                <h2>Logged in as: {this.props.user.email}</h2>
                <h3 className="p-4">Enter Credentials Here</h3>

                <form onSubmit={this.handleLoginSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="form-control"
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
