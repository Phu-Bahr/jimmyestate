import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";
import WorthPhotoContainer from "./WorthPhotoContainer";
import {
  FadeIn,
  FadeInRight,
  ParallaxBannerRoutes
} from "../../Constants/Constants";

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
      message: "",
      homeWorthEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: true,
      bannerImage: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddFeatureChange = this.onAddFeatureChange.bind(this);
    this.onResolved = this.onResolved.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  clickEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
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

  componentDidMount() {
    fetch("/api/v1/worth_edits")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        let newHomeWorthEditData = body;
        this.setState({
          homeWorthEditData: newHomeWorthEditData,
          id: newHomeWorthEditData[0].id,
          bannerText1: newHomeWorthEditData[0].bannerText1,
          bannerText2: newHomeWorthEditData[0].bannerText2,
          paragraph1: newHomeWorthEditData[0].paragraph1,
          paragraph2: newHomeWorthEditData[0].paragraph2,
          bannerImage: newHomeWorthEditData[0].bannerImage
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/worth_edits")
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(response => response.json())
        .then(body => {
          let newHomeWorthEditData = body;
          this.setState({
            homeWorthEditData: newHomeWorthEditData
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  onSubmitEdit(event) {
    event.preventDefault();
    const urls = "/api/v1/worth_edits/1";
    const {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      bannerImage
    } = this.state;

    const body = {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Edit successful");
          return response;
        } else {
          alert("Something went wrong");
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  render() {
    let hide;
    if (this.state.hideDiv) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let homeContent = this.state.homeWorthEditData.map(element => {
      return (
        <div key={element.id}>
          <p className="pb-2">{element.paragraph1}</p>
          <p className="pb-2">{element.paragraph2}</p>
        </div>
      );
    });

    let editForm = (
      <div className="container">
        <form
          onSubmit={event => {
            this.onSubmitEdit(event);
            event.target.reset();
          }}
          className={hide}
        >
          <div className="form-group">
            <label htmlFor="bannerImage">Banner Image</label>
            <input
              type="text"
              name="bannerImage"
              id="bannerImage"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.bannerImage}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bannerText1">Your bannerText1</label>
            <input
              type="text"
              name="bannerText1"
              id="bannerText1"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.bannerText1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bannerText2">Your bannerText2</label>
            <input
              type="text"
              name="bannerText2"
              id="bannerText2"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.bannerText2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paragraph1">Your paragraph1</label>
            <input
              type="text"
              name="paragraph1"
              id="paragraph1"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.paragraph1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paragraph2">Your paragraph2</label>
            <input
              type="text"
              name="paragraph2"
              id="paragraph2"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.paragraph2}
            />
          </div>
          <div className="pb-3">
            <button type="submit" className="btn custom-button">
              Update
            </button>
          </div>
        </form>
      </div>
    );

    let contactHomeWorthForm = (
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
    );

    return (
      <React.Fragment>
        <div className="flex-container">
          <FadeIn>
            <ParallaxBannerRoutes
              bannerImage={this.state.bannerImage}
              headerText1={this.state.bannerText1}
              headerText2={this.state.bannerText2}
            />
          </FadeIn>
          {this.props.user.admin ? (
            <div className="container py-3">
              <div className="row">
                <div className="col text-center">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={this.clickEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="container py-5">
            <div className="row">
              <WorthPhotoContainer user={this.props.user} hide={hide} />
              <div className="col-sm-6">
                <FadeInRight>
                  {homeContent}
                  {editForm}
                  {contactHomeWorthForm}
                </FadeInRight>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeWorthContainer;
