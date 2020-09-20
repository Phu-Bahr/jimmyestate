import React, { Component, Fragment } from "react";
import CardsContainer from "../Home/Cards/CardsContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import EventContainer from "../Home/Events/EventContainer";
import ScrollAnimation from "react-animate-on-scroll";
import AlertBox from "../Constants/AlertComponent";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { typeOfAlert: null };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });

  render() {
    return (
      <main>
        <AlertBox {...this.state} alertType={this.alertType} />
        <JumbotronContainer {...this.props} />

        <ScrollAnimation animateIn="fadeIn">
          <AnnouncementContainer {...this.props} alertType={this.alertType} />
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeIn">
          <EventContainer user={this.props.user} alertType={this.alertType} />
        </ScrollAnimation>

        <CardsContainer {...this.props} alertType={this.alertType} />
      </main>
    );
  }
}

export default Home;
