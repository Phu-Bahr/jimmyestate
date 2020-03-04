import React, { Component } from "react";
// import { Link, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
// fix links
class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light site-header sticky-top py-4">
        <div className="container-fluid" style={{ maxWidth: 1150 }}>
          <div
            className="navbar-font"
            role="navigation"
            onClick={this.scrollToTop}
          >
            JC REALTY
          </div>

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
                  FEATURED COMMUNITIES
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/" className="dropdown-item navbar-underline">
                    Arlington
                  </Link>
                  <Link to="/" className="dropdown-item navbar-underline">
                    Belmont
                  </Link>
                  <Link to="/" className="dropdown-item navbar-underline">
                    Brookline
                  </Link>
                  <Link to="/" className="dropdown-item navbar-underline">
                    Newton
                  </Link>
                  <Link to="/" className="dropdown-item navbar-underline">
                    Waltham
                  </Link>
                  <Link to="/" className="dropdown-item navbar-underline">
                    Watertown
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/service" className="nav-link navbar-underline">
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link navbar-underline">
                  ABOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link navbar-underline">
                  CONTACT
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
