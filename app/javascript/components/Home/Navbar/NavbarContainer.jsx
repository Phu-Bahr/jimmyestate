import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

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
            JIMMY CHAO REALTY
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
                <Link
                  to="reservationTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/newVenue"
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
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Arlington
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Belmont
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Brookline
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Newton
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Waltham
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Watertown
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  to="companyTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="announcementTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
                  ABOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="contactTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
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
