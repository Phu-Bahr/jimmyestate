import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";
import MarketPhotoContainer from "./MarketPhotoContainer";
import {
  FadeIn,
  FadeInLeft,
  ParallaxBannerRoutes
} from "../../Constants/Constants";

class MarketReportsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      destinationaddress: "",
      message: "",
      marketEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: true,
      bannerImage: "",
      id: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onResolved = this.onResolved.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  clickEdit() {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
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

    const url = "/api/v1/market_reports";

    const { name, email, phone, destinationaddress, message } = this.state;

    const body = {
      name,
      email,
      phone,
      destinationaddress,
      message
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
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

  onSubmitEdit(event) {
    event.preventDefault();
    const url = `/api/v1/market_report_edits/${this.state.id}`;
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

    fetch(url, {
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
          alert("something went wrong");
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/market_report_edits")
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
        this.setState({
          marketEditData: body,
          id: body[0].id,
          bannerText1: body[0].bannerText1,
          bannerText2: body[0].bannerText2,
          paragraph1: body[0].paragraph1,
          paragraph2: body[0].paragraph2,
          bannerImage: body[0].bannerImage
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/market_report_edits")
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
          this.setState({
            marketEditData: body
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  render() {
    let hide;
    if (this.state.hideDiv) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let locationContent = this.state.marketEditData.map(element => {
      return (
        <div key={element.id}>
          <p className="pb-2">{element.paragraph1}</p>
          <p className="pb-2">{element.paragraph2}</p>
        </div>
      );
    });

    let editMarketReportInfo = (
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
            <label htmlFor="bannerText1">Your Banner Text 1</label>
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
            <label htmlFor="bannerText2">Your Banner Text 2</label>
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
            <label htmlFor="paragraph1">Your Paragraph 1</label>
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
            <label htmlFor="paragraph2">Your Paragraph 2</label>
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

    let contactRelocationForm = (
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
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
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
        <div className="form-group">
          <label htmlFor="destinationaddress">
            Town/Neighborhood of Interest
          </label>
          <input
            type="text"
            name="destinationaddress"
            id="destinationaddress"
            className="form-control"
            onChange={this.onChange}
            required
          />
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
            placeholder="Please provide any additional questions or information."
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
              <div className="col-sm-6 pb-3">
                <FadeInLeft>
                  {locationContent}
                  {editMarketReportInfo}
                  {contactRelocationForm}
                </FadeInLeft>
              </div>
              <MarketPhotoContainer user={this.props.user} hide={hide} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketReportsContainer;
