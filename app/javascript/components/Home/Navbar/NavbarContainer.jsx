import React, { Component } from "react";
import { Link } from "react-router-dom";
import TownList from "../Town/TownList";
import { animateScroll as scroll } from "react-scroll";

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.setState = { refreshKey: false };
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
          <Link to="/login">
            <div className="navbar-font" onClick={this.scrollToTop}>
              JC Realty
            </div>
          </Link>

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
                <Link
                  to="/"
                  className="nav-link navbar-underline"
                  onClick={this.scrollToTop}
                >
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
                <div
                  className="dropdown-menu dropdown-menu-right animate slideIn"
                  aria-labelledby="navbarDropdown"
                >
                  <TownList
                    loggedInStatus={this.props.loggedInStatus}
                    user={this.props.user}
                    hideEditButton={hideEditButton}
                  />
                  <div className={hideEditButton}>
                    <div className="dropdown-divider"></div>
                    <Link
                      to="/addcommunity"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      Add Community
                    </Link>
                  </div>
                </div>
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
                  Services
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right animate slideIn"
                  id="about"
                  aria-labelledby="navbarDropdown"
                >
                  <div className="container py-1">
                    <Link
                      to="/buyinghome"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      Buying Property
                    </Link>
                  </div>
                  <div className="container py-1">
                    <Link
                      to="/sellinghome"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      Selling Property
                    </Link>
                  </div>
                  <div className="container py-1">
                    <Link
                      to="/homeworth"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      What's my home worth?
                    </Link>
                  </div>
                  <div className="container py-1">
                    <Link
                      to="/relocation"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      Relocation Assistance
                    </Link>
                  </div>
                </div>
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
                  About
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right animate slideIn"
                  id="about"
                  aria-labelledby="navbarDropdown"
                >
                  <div className="container py-1">
                    <Link
                      to="/about"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      About Jimmy Chau
                    </Link>
                  </div>
                  <div className="container py-1">
                    <Link
                      to="/portfolio"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      Sold Portfolio
                    </Link>
                  </div>
                  <div className="container py-1">
                    <Link
                      to="/aboutcompany"
                      className="dropdown-item navbar-underline"
                      onClick={this.scrollToTop}
                    >
                      About RTN Realty Advisors
                    </Link>
                  </div>
                </div>
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
