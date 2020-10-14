import React, { Component } from "react";

class BoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container p-5">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-4 py-3 ">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-spread-text"></i>
              <h2 className="feature-box__heading">Get Educated</h2>
              <p className="feature-box__text">Trust me and my experience.</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 py-3">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-cup"></i>
              <h2 className="feature-box__heading">Feel Confident</h2>
              <p className="feature-box__text">
                Trust me and my fellow clients.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 py-3">
            <div className="feature-box">
              <i className="feature-box__icon icon-basic-joypad"></i>
              <h2 className="feature-box__heading">Be in Control</h2>
              <p className="feature-box__text">Trust me with all your needs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BoxContainer;
