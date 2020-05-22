import React, { Component } from "react";
import VenueContainer from "../Home/Venue/VenueContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import ScrollAnimation from "react-animate-on-scroll";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    const urls = "/logout";

    fetch(urls, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      // set below to blank string from invisibleto default show edit buttons
      hideEditButton = "invisible";
    }

    return (
      <div className="master">
        <JumbotronContainer hideEditButton={hideEditButton} />
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
          <AnnouncementContainer hideEditButton={hideEditButton} />
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
          <VenueContainer hideEditButton={hideEditButton} {...this.props} />
        </ScrollAnimation>
      </div>
    );
  }
}

export default Home;
