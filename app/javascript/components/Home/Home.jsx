import React, { Component } from "react";
import VenueContainer from "../Home/Venue/VenueContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import ScrollAnimation from "react-animate-on-scroll";
import JimmyBusinessPartners from "../Home/JimmyPartners/JimmyBusinessPartnersContainer";

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

        <ScrollAnimation animateIn="fadeIn">
          <AnnouncementContainer hideEditButton={hideEditButton} />
        </ScrollAnimation>
        {/* <ScrollAnimation animateIn="fadeIn">
          <JimmyBusinessPartners user={this.props.user} />
        </ScrollAnimation> */}

        <VenueContainer hideEditButton={hideEditButton} {...this.props} />
      </div>
    );
  }
}

export default Home;
