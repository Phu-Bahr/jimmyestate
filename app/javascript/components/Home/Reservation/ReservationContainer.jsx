import React, { Component } from "react";

class ReservationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="reservationTag">
        <div className="parallaxReservation">
          <div className="center">
            <h1 className="companyfont">Reservations</h1>
          </div>
        </div>
        <section className="container-fluid companycontent py-5">
          <div className="container">
            <p>
              Looking to attend one of our hottest nights? Contact any of the
              following in Contacts below or fill in our form (coming soon).
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default ReservationContainer;
