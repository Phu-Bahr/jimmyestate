import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";
import Home from "../components/Home/Home";
import Registration from "./User/Registration";
import Login from "./User/Login";
import AboutContainer from "./About/AboutJimmy/AboutContainer";
import AboutCompanyContainer from "./About/AboutCompany/AboutCompanyContainer";
import JimmysTipsContainer from "./About/JimmysTips/JimmysTipsContainer";
import ContactContainer from "./Contact/ContactContainer";
import NavbarContainer from "./Navbar/NavbarContainer";
import FooterContainer from "./Footer/FooterContainer";
import NewTown from "./FeaturedCommunities/Town/NewTown";
import TownShowPage from "./FeaturedCommunities/Town/TownShowPage";
import EditTown from "./FeaturedCommunities/Town/EditTown";
import PortfolioContainer from "./About/Portfolio/PortfolioContainer";
import HomeWorthContainer from "./Service/HomeWorth/HomeWorthContainer/HomeWorthContainer";
import RelocationContainer from "./Service/Relocation/RelocationContainer/RelocationContainer";
import BuyingHomeContainer from "./Service/BuyingHome/BuyingHomeContainer";
import SellingHomeContainer from "./Service/SellingHome/SellingHomeContainer";
import MarketReportsContainer from "./Service/MarketReports/MarketReportsContainer";
import TestimonialsContainer from "./About/Testimonials/TestimonialsContainer";
import NewPartner from "./JimmyPartners/NewPartner";
import PartnerShowPage from "./JimmyPartners/PartnerShowPage";
import EditPartner from "./JimmyPartners/EditPartner";
import NotFoundPage from "./Constants/NotFoundPage";
import PrivacyPolicy from "./Constants/PrivacyPolicy";

library.add(fab, faTrashAlt, faEdit);

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "Not Logged In",
      user: {}
    };
  }

  handleLogin = data =>
    this.setState({ loggedInStatus: "Logged In", user: data.user });

  handleLogout = () =>
    this.setState({ loggedInStatus: "Not Logged In", user: {} });

  checkLoginStatus = () => {
    fetch("/logged_in", { credentials: "include" })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(data => {
        data.logged_in && (this.state.loggedInStatus = "Not Logged In")
          ? this.setState({ loggedInStatus: "Logged In", user: data.user })
          : data.logged_in == false && (this.state.loggedInStatus = "Logged In")
          ? this.setState({ loggedInStatus: "Not Logged In", user: {} })
          : null;
      })
      .catch(error => console.log("check login error", error));
  };

  componentDidMount = () => {
    this.checkLoginStatus();
    ReactGA.pageview(window.location.pathname);
  };

  render() {
    const ProtectedRoute = ({ component: Comp, path }) => {
      return (
        <Route
          path={path}
          render={props => {
            return this.state.user.admin ? (
              <Comp
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                refreshTownList={this.refreshTownList}
              />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    prevLocation: path,
                    error: "You need to login first!"
                  }
                }}
              />
            );
          }}
        />
      );
    };

    return (
      <Router history={history}>
        <NavbarContainer
          loggedInStatus={this.state.loggedInStatus}
          user={this.state.user}
          refreshTownList={this.refreshTownList}
          ref={this.refreshingTownList}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          {...this.props}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                handleLogout={this.handleLogout}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/buying-a-home"
            render={props => (
              <BuyingHomeContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/selling-a-home"
            render={props => (
              <SellingHomeContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/homeworth"
            render={props => (
              <HomeWorthContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/relocation"
            render={props => (
              <RelocationContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/market-reports"
            render={props => (
              <MarketReportsContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={props => (
              <AboutContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/aboutcompany"
            render={props => (
              <AboutCompanyContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/portfolio"
            render={props => (
              <PortfolioContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          {/* <Route
            exact
            path="/jimmys-tips"
            render={props => (
              <JimmysTipsContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          /> */}
          <Route
            exact
            path="/testimonials"
            render={props => (
              <TestimonialsContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/contact"
            render={props => (
              <ContactContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/towns/:id?"
            render={props => (
              <TownShowPage
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />

          <Route
            exact
            path="/partner_categories/:id?"
            render={props => (
              <PartnerShowPage
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />

          <ProtectedRoute exact path="/addcommunity" component={NewTown} />
          <ProtectedRoute
            exact
            path="/add-partner-category"
            component={NewPartner}
          />
          <ProtectedRoute
            exact
            path="/editcommunity/:id?"
            component={EditTown}
          />
          <ProtectedRoute
            exact
            path="/edit-partner-category/:id?"
            component={EditPartner}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <ProtectedRoute exact path="/registration" component={Registration} />
          <Route
            exact
            path="/privacy-policy"
            render={props => (
              <PrivacyPolicy
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route path="/page-404" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <FooterContainer
          loggedInStatus={this.state.loggedInStatus}
          user={this.state.user}
        />
      </Router>
    );
  }
}

export default App;
