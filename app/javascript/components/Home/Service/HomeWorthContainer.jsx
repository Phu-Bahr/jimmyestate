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
      time: "Anytime",
      address: "",
      squarefootage: "",
      numberbedrooms: "",
      numberbathrooms: "",
      propertytype: "Single Family",
      addfeatures: {
        HardwoodFloors: false,
        Garage: false,
        EatinKitchen: false,
        FamilyRoom: false,
        CentralAir: false,
        GasHeat: false,
        SwimmingPool: false,
        HotTub: false,
        BreakfastArea: false,
        GameRoom: false,
        DenStudy: false,
        Views: false
      },
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddFeatureChange = this.onAddFeatureChange.bind(this);
    this.onResolved = this.onResolved.bind(this);
  }

  renderAddFeatures() {
    const features = {
      HardwoodFloors: "Hardwood Floors",
      Garage: "Garage",
      EatinKitchen: "Eat-in Kitchen",
      FamilyRoom: "Family Room",
      CentralAir: "Central Air",
      GasHeat: "Gas Heat",
      SwimmingPool: "Swimming Pool",
      HotTub: "Hot Tub",
      BreakfastArea: "Breakfast Area",
      GameRoom: "Game Room",
      DenStudy: "Den/Study",
      Views: "Views"
    };

    const featurePair = Object.entries(features).map(([key, value]) => {
      return (
        <div key={key} className="col-md-4">
          <input
            className="form-check-input"
            type="checkbox"
            id={key}
            name={key}
            onChange={this.onAddFeatureChange}
            value={this.state.addfeatures[key]}
          />
          <label className="form-check-label" htmlFor={key}>
            {value}
          </label>
        </div>
      );
    });

    return featurePair;
  }

  onAddFeatureChange(e) {
    const val = e.target.checked;
    const name = e.target.name;
    let updateFeatures = Object.assign({}, this.state.addfeatures, {
      [name]: val
    });
    this.setState({
      addfeatures: updateFeatures
    });
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
    const bodyFeatures = featureObject => {
      let parsedFeatures = [];
      for (let [key, value] of Object.entries(featureObject)) {
        if (value) {
          parsedFeatures.push(key);
        }
      }
      return parsedFeatures.join(", ").toString();
    };

    let addfeatures = bodyFeatures(this.state.addfeatures);

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
          alert("Your inquiry has been received!");
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
    // console.log(parsedFeatures.join(", ").toString());

    // console.log("state homeworth page form ===>", this.state.addfeatures);

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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="time">Best time to reach you</label>
                    <select
                      type="text"
                      name="time"
                      id="time"
                      className="form-control"
                      onChange={this.onChange}
                      required
                      value={this.state.time}
                    >
                      <option>Anytime</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Your Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="squarefootage">Square Footage</label>
                    <input
                      type="text"
                      name="squarefootage"
                      id="squarefootage"
                      className="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="numberbedrooms"># of Bedrooms</label>
                    <input
                      type="text"
                      name="numberbedrooms"
                      id="numberbedrooms"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="numberbathrooms"># of Bathrooms</label>
                    <input
                      type="text"
                      name="numberbathrooms"
                      id="numberbathrooms"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="propertytype">Property Type</label>
                  <select
                    type="text"
                    name="propertytype"
                    id="propertytype"
                    className="form-control"
                    onChange={this.onChange}
                    required
                    value={this.state.propertytype}
                  >
                    <option>Single Family</option>
                    <option>Condo</option>
                    <option>Multi Family</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="addfeatures">Additional Features</label>
                  <br />
                  <div className="row pl-5">{this.renderAddFeatures()}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    rows="5"
                    type="text"
                    name="message"
                    id="message"
                    className="form-control"
                    onChange={this.onChange}
                    required
                    placeholder="Additional information you'd like to tell me."
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
