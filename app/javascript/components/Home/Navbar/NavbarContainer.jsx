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
            PlusONE
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
                  VENUES
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Club 1 Website
                  </Link>
                  <Link
                    to="/newVenue"
                    className="dropdown-item navbar-underline"
                  >
                    Club 2 Website
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="venueTag"
                    className="dropdown-item navbar-underline"
                    smooth={true}
                    offset={-90}
                    duration={1100}
                  >
                    Bring to list of clubs here
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  to="reservationTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
                  RESERVATIONS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="companyTag"
                  className="nav-link navbar-underline"
                  smooth={true}
                  offset={-90}
                  duration={1100}
                >
                  COMPANY
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
                  Events
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
