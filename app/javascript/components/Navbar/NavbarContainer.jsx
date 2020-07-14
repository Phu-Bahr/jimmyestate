import React, { Component } from "react";
import { Link } from "react-router-dom";
import TownList from "../FeaturedCommunities/Town/TownList";
import PartnerList from "../JimmyPartners/PartnerList";
import { animateScroll as scroll } from "react-scroll";
import { FadeInDown, Transition, StyledNavbar } from "../Constants/Constants";
import AdminBanner from "../User/AdminBanner";

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshKey: false, show: true, scrollPos: 0 };
    this.handleScroll = this.handleScroll.bind(this);
  }

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  toggleRefreshFalse = () => {
    this.setState({ refreshKey: false });
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentDidMount = () =>
    window.addEventListener("scroll", this.handleScroll);

  componentWillUnmount = () =>
    window.removeEventListener("scroll", this.handleScroll);

  handleScroll() {
    const { scrollPos } = this.state;
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top > scrollPos
    });
  }

  render() {
    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      hideEditButton = "invisible";
    }

    let navLists = (
      <React.Fragment>
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
            Services
          </Link>
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            id="about"
            aria-labelledby="navbarDropdown"
          >
            <div className="container py-1">
              <Link
                to="/buying-a-home"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                Buying Property
              </Link>
            </div>
            <div className="container py-1">
              <Link
                to="/selling-a-home"
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
            <div className="container py-1">
              <Link
                to="/market-reports"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                Market Reports
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
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            id="about"
            aria-labelledby="navbarDropdown"
          >
            <div className="container py-1">
              <Link
                to="/about"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                About Jimmy Chao
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
            <div className="container py-1">
              <Link
                to="/jimmys-tips"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                Jimmy's Tips
              </Link>
            </div>
            <div className="container py-1">
              <Link
                to="/testimonials"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                Testimonials
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
            Featured Communities
          </Link>
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
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
            Business Partners
          </Link>
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <PartnerList
              loggedInStatus={this.props.loggedInStatus}
              user={this.props.user}
              hideEditButton={hideEditButton}
            />
            <div className={hideEditButton}>
              <div className="dropdown-divider"></div>
              <Link
                to="/add-partner-category"
                className="dropdown-item navbar-underline"
                onClick={this.scrollToTop}
              >
                Add Partner Category
              </Link>
            </div>
          </div>
        </li>

        <li>
          <Link
            to="/contact"
            className="nav-link navbar-underline"
            onClick={this.scrollToTop}
          >
            Contact
          </Link>
        </li>
      </React.Fragment>
    );

    let collapseMenuLogic;
    if (window.innerWidth < 1100) {
      collapseMenuLogic = (
        <ul
          className="navbar-nav ml-auto"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          {navLists}
        </ul>
      );
    } else {
      collapseMenuLogic = <ul className="navbar-nav ml-auto">{navLists}</ul>;
    }
    console.log("window width==>", window.innerWidth);

    return (
      <Transition>
        <StyledNavbar
          className={
            document.body.getBoundingClientRect().top === 0
              ? "top"
              : this.state.show
              ? "active"
              : "hidden"
          }
        >
          <FadeInDown>
            <nav className="navbar navbar-expand-lg navbar-light site-header py-4 navbar-font-type">
              <div className="container-fluid" style={{ maxWidth: 1150 }}>
                {this.props.user.admin ? (
                  <AdminBanner
                    user={this.props.user}
                    loggedInStatus={this.props.loggedInStatus}
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                  />
                ) : (
                  <Link to="/login">
                    <div className="navbar-font" onClick={this.scrollToTop}>
                      Jimmy Chao
                    </div>
                  </Link>
                )}
                <button
                  type="button"
                  className="navbar-toggler"
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
                  {collapseMenuLogic}
                </div>
              </div>
            </nav>
          </FadeInDown>
        </StyledNavbar>
      </Transition>
    );
  }
}

export default NavbarContainer;
