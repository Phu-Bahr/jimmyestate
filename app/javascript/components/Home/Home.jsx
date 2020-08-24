import React, { Fragment } from "react";
import CardsContainer from "../Home/Cards/CardsContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import EventContainer from "../Home/Events/EventContainer";
import ScrollAnimation from "react-animate-on-scroll";

const Home = props => {
  return (
    <Fragment>
      <JumbotronContainer {...props} />

      <ScrollAnimation animateIn="fadeIn">
        <AnnouncementContainer {...props} />
      </ScrollAnimation>

      <ScrollAnimation animateIn="fadeIn">
        <EventContainer user={props.user} />
      </ScrollAnimation>

      <CardsContainer {...props} />
    </Fragment>
  );
};

export default Home;
