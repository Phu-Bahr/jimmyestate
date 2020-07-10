import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      redirect: null
    };
  }

  scrollToTop = () => scroll.scrollToTop();
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  directToPath = () => this.props.history.goBack();

  handleLoginSubmit = event => {
    event.preventDefault();
    const url = "/api/v1/sessions";
    const { email, password } = this.state;
    const body = { user: { email: email, password: password } };

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
        if (data.logged_in) {
          this.props.handleLogin(data);
        }
      })
      // .then(this.props.history.push("/"))
      // .then(this.setState({ redirect: "/contact" }))
      .then(this.directToPath)
      .catch(error => {
        console.log("login error", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect != null && <Redirect to={this.state.redirect} />}
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

                  <div className="row d-flex justify-content-center">
                    <div className="px-1">
                      <button
                        className="btn btn-info"
                        type="submit"
                        onClick={this.scrollToTop}
                      >
                        Login
                      </button>
                    </div>
                  </div>
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
