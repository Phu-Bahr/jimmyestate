import React, { Component } from "react";
import CardsContainer from "../Home/Cards/CardsContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import ScrollAnimation from "react-animate-on-scroll";
import EventContainer from "../Home/Events/EventContainer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    const url = "/logout";

    fetch(url, {
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
      <div>
        <JumbotronContainer {...this.props} />

        <ScrollAnimation animateIn="fadeIn">
          <AnnouncementContainer
            hideEditButton={hideEditButton}
            {...this.props}
          />
        </ScrollAnimation>
        <EventContainer user={this.props.user} />

        <CardsContainer hideEditButton={hideEditButton} {...this.props} />
      </div>
    );
  }
}

export default Home;
