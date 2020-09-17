import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminBanner = props => {
  const handleLogoutClick = () => {
    const url = "/logout";
    fetch(url, { method: "DELETE", credentials: "include" })
      .then(() => props.handleLogout())
      .catch(error => console.log("logout error", error));
  };

  return (
    <Fragment>
      {props.user.admin && (
        <div className="container text-center p-4">
          <div className="row ">
            <div className="col-sm-7 col-md-7 col-lg-12 col-xl-6">
              <h4 style={{ fontWeight: "bold" }}>Administration Mode</h4>
            </div>
            <div className="col-sm-5 col-md-5 col-lg-12 col-xl-6 btn-group">
              <button className="btn btn-info" onClick={handleLogoutClick}>
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
};

export default AdminBanner;
