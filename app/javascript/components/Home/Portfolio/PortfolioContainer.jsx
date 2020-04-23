import React, { Component } from "react";

class PortfolioContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="parallaxAboutPortfolioPage darken-pseudo darken-with-text">
          <h1 className="text-center caption">PORTFOLIO</h1>
        </div>

        <div className="container text-center">
          <h4>ACTIVE PROPERTIES</h4>

          <div className="row">
            <div className="col-md-4 col-middle px-3 py-2">
              <div className="card border-0">
                <div className="parent m-0">
                  <div className="child particles">
                    <img
                      className="venueImage card-img-top"
                      src="https://images.pexels.com/photos/1735658/pexels-photo-1735658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    />
                    <div className="portfolioTitle">SOLD</div>
                  </div>
                </div>

                <div className="card-body">
                  <div style={{ fontWeight: "900" }}>$PRICE PROP</div>
                  <div>STREET# STREET ADDRESS, APT#</div>
                  <div>CITY, STATE ZIP</div>
                </div>
              </div>
            </div>
          </div>
          <h4>SOLD PROPERTIES </h4>
          <h4>RENTED PROPERTIES</h4>
        </div>
      </div>
    );
  }
}
export default PortfolioContainer;
