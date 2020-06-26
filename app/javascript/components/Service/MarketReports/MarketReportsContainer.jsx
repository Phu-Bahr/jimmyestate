import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";
import MarketPhotoContainer from "./MarketPhotoContainer";
import {
  FadeIn,
  FadeInLeft,
  ParallaxBannerRoutes,
  FormMaps
} from "../../Constants/Constants";
import {
  postFetch,
  postFetchEmail,
  putFetch,
  getFetch
} from "../../Constants/FetchComponent";
import { SubmitEmailButton } from "../../Constants/Buttons";

class MarketReportsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "market_report_edits",
      urlEmailForm: "market_reports",
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
      hideDiv: false,
      bannerImage: "",
      id: ""
    };
  }

  clickEdit = () => {
    this.state.hideDiv
      ? this.setState({ hideDiv: false })
      : this.setState({ hideDiv: true });
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  onResolved = () => {
    console.log("Captcha all set");
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.recaptcha.execute();
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/${this.state.urlEmailForm}`;
    const { name, email, phone, destinationaddress, message } = this.state;
    const body = {
      name,
      email,
      phone,
      destinationaddress,
      message
    };

    postFetchEmail(url, token, body)
      .then(this.scrollToTop)
      .catch(error => console.log(error.message));
  };

  onSubmitEdit = event => {
    event.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/${this.state.url}/${this.state.id}`;
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

    putFetch(url, token, body)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  mountState = body => {
    this.setState({
      marketEditData: body,
      id: body[body.length - 1].id,
      bannerText1: body[body.length - 1].bannerText1,
      bannerText2: body[body.length - 1].bannerText2,
      paragraph1: body[body.length - 1].paragraph1,
      paragraph2: body[body.length - 1].paragraph2,
      bannerImage: body[body.length - 1].bannerImage
    });
  };
  componentDidMount() {
    getFetch(this.state.url)
      .then(body => {
        this.mountState(body);
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      getFetch(this.state.url)
        .then(body => {
          this.mountState(body);
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  render() {
    const marketFormData = {
      bannerImage: "Banner Image",
      bannerText1: "Banner Text 1",
      bannerText2: "Banner Text 2",
      paragraph1: "Paragraph 1",
      paragraph2: "Paragraph 2"
    };

    let editMarketReportInfo = (
      <div className="container">
        <form
          onSubmit={event => {
            this.onSubmitEdit(event);
            event.target.reset();
          }}
        >
          <FormMaps
            formConst={marketFormData}
            onChange={this.onChange}
            value={this.state}
          />
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

        <div className="form-group">
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
        <SubmitEmailButton />
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
                  <div>
                    <p className="pb-2">{this.state.paragraph1}</p>
                    <p className="pb-2">{this.state.paragraph2}</p>
                  </div>
                  {this.state.hideDiv ? editMarketReportInfo : null}
                  {contactRelocationForm}
                </FadeInLeft>
              </div>
              <MarketPhotoContainer
                user={this.props.user}
                hide={this.state.hideDiv}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketReportsContainer;
