import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "../components/Home/Home";
import Registration from "../components/Home/User/Registration";
import Login from "../components/Home/User/Login";
import AboutContainer from "../components/Home/About/AboutContainer";
import AboutCompanyContainer from "../components/Home/AboutCompany/AboutCompanyContainer";
import JimmysTipsContainer from "../components/Home/JimmysTips/JimmysTipsContainer";
import ContactContainer from "../components/Home/Contact/ContactContainer";
import NavbarContainer from "../components/Home/Navbar/NavbarContainer";
import NewTown from "../components/Home/Town/NewTown";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import FooterContainer from "../components/Home/Footer/FooterContainer";
import TownShowPage from "../components/Home/Town/TownShowPage";
import EditTown from "../components/Home/Town/EditTown";
import PortfolioContainer from "./Home/Portfolio/PortfolioContainer";
import HomeWorthContainer from "../components/Home/Service/HomeWorthContainer";
import RelocationContainer from "../components/Home/Service/RelocationContainer";
import BuyingHomeContainer from "../components/Home/Service/BuyingHomeContainer";
import SellingHomeContainer from "../components/Home/Service/SellingHomeContainer";
import MarketReportsContainer from "../components/Home/Service/MarketReportsContainer";
import Testimonials from "./Home/Testimonials/TestimonialsContainer";

library.add(fab, faTrashAlt, faEdit);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "Not Logged In",
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.refreshTownList = this.refreshTownList.bind(this);
    this.refreshingTownList = React.createRef();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged In",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({ loggedInStatus: "Not Logged In", user: {} });
    console.log("logoutclicked!");
  }

  checkLoginStatus() {
    const urls = "/logged_in";

    fetch(urls, { credentials: "include" })
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
        if (
          data.logged_in === true &&
          (this.state.loggedInStatus = "Not Logged In")
        ) {
          this.setState({
            loggedInStatus: "Logged In",
            user: data.user
          });
        } else if (
          data.logged_in === false &&
          (this.state.loggedInStatus = "Logged In")
        ) {
          this.setState({ loggedInStatus: "Not Logged In", user: {} });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  refreshTownList() {
    this.refreshingTownList.current.toggleRefreshKey();
  }

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
      <Router>
        <NavbarContainer
          loggedInStatus={this.state.loggedInStatus}
          user={this.state.user}
          refreshTownList={this.refreshTownList}
          ref={this.refreshingTownList}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
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
          <Route
            exact
            path="/jimmys-tips"
            render={props => (
              <JimmysTipsContainer
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/testimonials"
            render={props => (
              <Testimonials
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

          <ProtectedRoute exact path="/addcommunity" component={NewTown} />
          <ProtectedRoute
            exact
            path="/editcommunity/:id?"
            component={EditTown}
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
          <Route path="*" component={() => "404 NOT FOUND"} />
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
