import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class AdminBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    const url = "/logout";

    fetch(url, {
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
      <Fragment>
        {this.props.user.admin && (
          <div className="container text-center p-4">
            <div className="row ">
              <div className="col-sm-6">
                <h4 style={{ fontWeight: "bold" }}>Administration Mode</h4>
              </div>
              <div className="col-sm-6 btn-group">
                <button
                  className="btn btn-info"
                  onClick={this.handleLogoutClick}
                >
                  Logout
                </button>
                <button className="btn btn-info">
                  <Link to="/registration" style={{ color: "white" }}>
                    Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default AdminBanner;
