import React, { Component } from "react";
import { Link } from "react-router-dom";
import TownList from "../Town/TownList";

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      hideEditButton = "invisible";
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light site-header sticky-top py-4 navbar-font-type">
        <div className="container-fluid" style={{ maxWidth: 1150 }}>
          <div className="navbar-font">JC Realty</div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link navbar-underline">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle navbar-underline"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Featured Communities
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <TownList />
                  <div className={hideEditButton}>
                    <div className="dropdown-divider"></div>
                    <Link
                      to="/addcommunity"
                      className="dropdown-item navbar-underline"
                    >
                      Add Community
                    </Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/service" className="nav-link navbar-underline">
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/about" className="nav-link navbar-underline">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link navbar-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarContainer;
