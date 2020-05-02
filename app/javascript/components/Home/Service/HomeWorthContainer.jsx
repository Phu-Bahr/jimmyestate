import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";

class HomeWorthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      time: "",
      address: "",
      squarefootage: "",
      numberbedrooms: "",
      numberbathrooms: "",
      propertytype: "",
      addfeatures: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onResolved = this.onResolved.bind(this);
  }

  onResolved() {
    console.log("Captcha all set");
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.recaptcha.execute();

    const urls = "/api/v1/home_worths";
    const {
      name,
      email,
      phone,
      time,
      address,
      squarefootage,
      numberbedrooms,
      numberbathrooms,
      propertytype,
      addfeatures,
      message
    } = this.state;

    const body = {
      name,
      email,
      phone,
      time,
      address,
      squarefootage,
      numberbedrooms,
      numberbathrooms,
      propertytype,
      addfeatures,
      message
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        alert(
          "There was a network issue, please try again or Email Jimmy directly."
        );
        throw new Error("Network response was not ok.");
      })
      .then(this.scrollToTop)
      .catch(error => console.log(error.message));
  }

  render() {
    console.log("state contact page form", this.state);

    return (
      <React.Fragment>
        <div className="parallaxHomeWorthPage darken-pseudo darken-with-text">
          <div className="container py-5">
            <h1>What's my home worth?</h1>
            <h4>Let's get you an assessment</h4>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-6">INSERT PHOTOS HERE</div>

            <div className="col-sm-6">
              <form
                onSubmit={event => {
                  this.onSubmit(event);
                  event.target.reset();
                }}
              >
                <div className="form-group">
                  <label htmlFor="name">Your Name (required)</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email (required)</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone number (required)</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">
                    Best time to reach you (required)
                  </label>
                  <input
                    type="text"
                    name="time"
                    id="time"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Your Address (required)</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="squarefootage">
                    Your Square Footage (required)
                  </label>
                  <input
                    type="text"
                    name="squarefootage"
                    id="squarefootage"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberbedrooms">
                    Number of Bedrooms (required)
                  </label>
                  <input
                    type="text"
                    name="numberbedrooms"
                    id="numberbedrooms"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberbathrooms">
                    Number of Bathrooms (required)
                  </label>
                  <input
                    type="text"
                    name="numberbathrooms"
                    id="numberbathrooms"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="propertytype">Property Type (required)</label>
                  <input
                    type="text"
                    name="propertytype"
                    id="propertytype"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addfeatures">
                    Additional Features (required)
                  </label>
                  <input
                    type="text"
                    name="addfeatures"
                    id="addfeatures"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message (required)</label>
                  <textarea
                    rows="5"
                    type="text"
                    name="message"
                    id="message"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn custom-button mt-3">
                  Send
                </button>
                <Recaptcha
                  ref={ref => (this.recaptcha = ref)}
                  sitekey="6LduIvAUAAAAANu_zPUXIWLmjk_L-ZWdJkAFJbx7"
                  onResolved={this.onResolved}
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeWorthContainer;
