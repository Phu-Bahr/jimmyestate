import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "../components/Home/Home";
import NewVenue from "../components/Home/Venue/NewVenue";
import Registration from "../components/Home/User/Registration";
import Login from "../components/Home/User/Login";
import ServiceContainer from "../components/Home/Service/ServiceContainer";
import AboutContainer from "../components/Home/About/AboutContainer";
import ContactContainer from "../components/Home/Contact/ContactContainer";
import NavbarContainer from "../components/Home/Navbar/NavbarContainer";
import NewTown from "../components/Home/Town/NewTown";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import FooterContainer from "../components/Home/Footer/FooterContainer";
import TownShowPage from "../components/Home/Town/TownShowPage";
import EditTown from "../components/Home/Town/EditTown";

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
        console.log("log in? =>>", data);

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
      <React.Fragment>
        <Router>
          <NavbarContainer
            loggedInStatus={this.state.loggedInStatus}
            user={this.state.user}
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
            <Route exact path="/service" component={ServiceContainer} />
            <Route exact path="/about" component={AboutContainer} />
            <Route exact path="/contact" component={ContactContainer} />
            <Route exact path="/towns/:id?" component={TownShowPage} />
            <ProtectedRoute path="/newVenue" component={NewVenue} />
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
            <ProtectedRoute
              exact
              path="/registration"
              component={Registration}
            />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>

          <FooterContainer
            loggedInStatus={this.state.loggedInStatus}
            user={this.state.user}
          />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
