import React from "react";
import CardsContainer from "../Home/Cards/CardsContainer";
import JumbotronContainer from "../Home/Jumbotron/JumbotronContainer";
import AnnouncementContainer from "../Home/Announcement/AnnouncementContainer";
import EventContainer from "../Home/Events/EventContainer";
import ScrollAnimation from "react-animate-on-scroll";

const Home = props => {
  return (
    <div>
      <JumbotronContainer {...props} />

      <ScrollAnimation animateIn="fadeIn">
        <AnnouncementContainer {...props} />
      </ScrollAnimation>
      <EventContainer user={props.user} />

      <CardsContainer {...props} />
    </div>
  );
};

export default Home;
