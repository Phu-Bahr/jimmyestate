import React, { Component } from "react";

class BoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="section-features">
        <div className="container h-100 p-5">
          <div className="row h-100">
            <div className="col-sm-12 col-md-12 col-lg-4 py-3 my-auto">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-spread-text"></i>
                <h2 className="feature-box__heading">Get Educated</h2>
                <p className="feature-box__text">Trust me and my experience.</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 py-3 my-auto">
              <div className="feature-box">
                {/* <i className="feature-box__icon icon-basic-cup"></i> */}

                <div className="feature-box__icon ">
                  <img
                    src="https://icon-library.net//images/confidence-icon/confidence-icon-20.jpg"
                    className="confidentIcon"
                  />
                </div>

                <h2 className="feature-box__heading">Feel Confident</h2>
                <p className="feature-box__text">
                  Trust me and my fellow clients.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 py-3 my-auto">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-joypad"></i>
                <h2 className="feature-box__heading">Be in Control</h2>
                <p className="feature-box__text">
                  Trust me with all your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BoxContainer;
