import React, { Component, Fragment } from "react";
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
    const url = "/api/v1/registrations";
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
      <Fragment>
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
                <h1 className="m-5">Status : {this.props.loggedInStatus}</h1>
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
                <div className="m-4">
                  <Link to="/">Back to Home page</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Registration;
