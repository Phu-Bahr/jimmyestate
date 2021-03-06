import React, { Component, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import TownList from "../FeaturedCommunities/Town/TownList";
import PartnerList from "../JimmyPartners/PartnerList";
import { animateScroll as scroll } from "react-scroll";
import AdminBanner from "../User/AdminBanner";
import AlertBox from "../Constants/AlertComponent";
import ReactGA from "react-ga";
import { deleteFetch, getFetch } from "../Constants/FetchComponent";

import {
  FadeInDown,
  Transition,
  StyledNavbar,
  DropdownHelper
} from "../Constants/Constants";

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: [],
      partnerData: [],
      refreshKey: false,
      show: true,
      scrollPos: 0,
      typeOfAlert: null,
      width: null,
      idForAlert: null,
      pathForAlert: ""
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  toggleRefreshFalse = () => this.setState({ refreshKey: false });
  scrollToTop = () => scroll.scrollToTop();

  handleDelete = (id, path) => {
    this.setState({ idForAlert: id, pathForAlert: path });
    this.alertType("delete");
  };

  deleteEvent = id => {
    const url = `/api/v1/${this.state.pathForAlert}/${id}`;
    deleteFetch(url, this.alertType)
      .then(this.toggleRefreshKey)
      .then(this.props.history.push("/"));
  };

  gaNavLinks = title => {
    if (innerWidth < 680) {
      ReactGA.event({
        category: "Mobile Navbar Link",
        action: `Mobile ${title} Nav Link Clicked`
      });
    } else {
      ReactGA.event({
        category: "Navbar Link",
        action: `${title} Nav Link Clicked`
      });
    }
    scroll.scrollToTop();
  };

  mountState = body => this.setState({ townData: body });
  mountState1 = body => this.setState({ partnerData: body });

  componentDidMount = () => {
    getFetch("towns", this.mountState);
    getFetch("partner_categories", this.mountState1);
    this.setState({ width: document.body.getBoundingClientRect().width });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  };

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch("towns", this.mountState)
      .then(this.setState({ refreshKey: false }))
      .then(
        getFetch("partner_categories", this.mountState1).then(
          this.setState({ refreshKey: false })
        )
      );

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  };

  handleScroll = () => {
    const { scrollPos } = this.state;
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top > scrollPos,
      width: document.body.getBoundingClientRect().width
    });
  };

  render() {
    let admin = this.props.user.admin;

    let headerLink = title => (
      <Link
        to="#"
        className="nav-link dropdown-toggle navbar-underline"
        id="navbarDropdown"
        //width determines how wide screen is then close hamburger menu on link click
        data-toggle={this.state.width < 990 && "dropdown"}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title}
      </Link>
    );

    let serviceList = [
      { path: "/buying-a-home", title: "Buying Property" },
      { path: "/selling-a-home", title: "Selling Property" },
      { path: "/homeworth", title: "What's my home worth?" },
      { path: "/relocation", title: "Relocation Assistance" },
      { path: "/market-reports", title: "Market Reports" }
    ];

    let aboutList = [
      { path: "/about", title: "About Jimmy Chao" },
      { path: "/portfolio", title: "Sold Portfolio" },
      { path: "/aboutcompany", title: "About RTN Realty Advisors" },
      // { path: "/jimmys-tips", title: "Jimmy's Tips" },
      { path: "/testimonials", title: "Testimonials" }
    ];

    let navLists = (
      <Fragment>
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link navbar-underline"
            onClick={() => this.gaNavLinks("Home")}
          >
            Home
          </Link>
        </li>

        <li className="nav-item m-0 dropdown">
          {headerLink("Services")}
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <DropdownHelper formConst={serviceList} />
          </div>
        </li>

        <li className="nav-item m-0 dropdown">
          {headerLink("About")}
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <DropdownHelper formConst={aboutList} />
          </div>
        </li>

        <li className="nav-item m-0 dropdown">
          {headerLink("Featured Communities")}
          <div
            className="dropdown-menu dropdown-menu-left py-3 animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <TownList
              loggedInStatus={this.props.loggedInStatus}
              user={this.props.user}
              alertType={this.alertType}
              handleDelete={this.handleDelete}
              townData={this.state.townData}
            />

            {admin && (
              <Fragment>
                <div className="dropdown-divider"></div>
                <Link
                  to="/addcommunity"
                  className="dropdown-item navbar-underline"
                >
                  Add Community
                </Link>
              </Fragment>
            )}
          </div>
        </li>

        <li className="nav-item m-0 dropdown">
          {headerLink("Preferred Services")}
          <div
            className="dropdown-menu dropdown-menu-right dropdown-menu-lg-right dropdown-menu-xl-right py-3 animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <PartnerList
              loggedInStatus={this.props.loggedInStatus}
              user={this.props.user}
              alertType={this.alertType}
              handleDelete={this.handleDelete}
              partnerData={this.state.partnerData}
            />

            {admin && (
              <Fragment>
                <div className="dropdown-divider"></div>
                <Link
                  to="/add-partner-category"
                  className="dropdown-item navbar-underline"
                >
                  Add Preferred Services
                </Link>
              </Fragment>
            )}
          </div>
        </li>

        <li className="nav-item">
          <Link
            to="/contact"
            className="nav-link navbar-underline"
            onClick={() => this.gaNavLinks("Contact")}
          >
            Contact
          </Link>
        </li>
      </Fragment>
    );

    let collapseMenuLogic;
    if (this.state.width < 990) {
      collapseMenuLogic = (
        <ul
          className="navbar-nav ml-auto py-3"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          {navLists}
        </ul>
      );
    } else {
      collapseMenuLogic = (
        <ul className="navbar-nav ml-auto py-3">{navLists}</ul>
      );
    }

    return (
      <Transition>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteEvent}
          urlPath={"towns"}
        />
        <StyledNavbar
          className={
            //controls when nav bar fades out based on scroll down position
            document.body.getBoundingClientRect().top > -15
              ? "active"
              : this.state.show
              ? "active"
              : "hidden"
          }
        >
          <FadeInDown>
            <header>
              <nav className="navbar navbar-expand-lg navbar-light site-header py-2">
                <div className="container-fluid" style={{ maxWidth: 1150 }}>
                  {this.props.user.admin ? (
                    <AdminBanner
                      user={this.props.user}
                      loggedInStatus={this.props.loggedInStatus}
                      handleLogin={this.props.handleLogin}
                      handleLogout={this.props.handleLogout}
                    />
                  ) : (
                    <Link
                      to="/"
                      onClick={() => this.gaNavLinks("Jimmy Chao")}
                      className="navbar-font"
                    >
                      Jimmy Chao
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
            </header>
          </FadeInDown>
        </StyledNavbar>
      </Transition>
    );
  }
}

export default NavbarContainer;
