import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminBanner extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    const urls = "/logout";

    fetch(urls, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user.admin ? (
          <div className="container text-center p-4">
            <h1>Administration Mode</h1>
            <div className="row d-flex justify-content-center">
              <div className="px-1">
                <button
                  className="btn btn-info"
                  onClick={this.handleLogoutClick}
                >
                  Logout
                </button>
              </div>
              <div className="px-1">
                <button className="btn btn-info">
                  <Link to="/registration" style={{ color: "white" }}>
                    Register New User
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default AdminBanner;
