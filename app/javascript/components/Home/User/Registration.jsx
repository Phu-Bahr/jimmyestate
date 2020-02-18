import React, { Component } from "react";
import { Link } from "react-router-dom";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/registrations";
    const { email, password, password_confirmation } = this.state;

    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    };

    fetch(urls, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "created") {
          this.props.handleLogin(data);
        }
      })
      .then(alert("User created. Ask Admin to give you credentials."))
      .then(this.props.history.push("/"))
      .catch(error => {
        console.log("registration error", error);
      });
  }

  render() {
    return (
      <div style={{ height: 1 }}>
        <div
          className="container text-center login-background"
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1>Status : {this.props.loggedInStatus}</h1>
            <form onSubmit={this.handleRegSubmit}>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <button type="submit">Register User</button>
            </form>
            <div>
              <Link to="/">Back to Home page</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
