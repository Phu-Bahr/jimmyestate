import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminBanner extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container text-center p-4">
        <div>
          <h1>Administration Mode</h1>
          <div className="row d-flex justify-content-center">
            <div className="px-1">
              <button
                className="btn btn-info"
                onClick={this.props.handleLogoutClick}
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
      </div>
    );
  }
}

export default AdminBanner;
