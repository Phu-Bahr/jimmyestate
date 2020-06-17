import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";
import WorthPhotoContainer from "./WorthPhotoContainer";
import {
  FadeIn,
  FadeInRight,
  ParallaxBannerRoutes,
  FormMaps
} from "../../Constants/Constants";
import {
  getFetch,
  putFetch,
  postFetchEmail
} from "../../Constants/FetchComponent";

class HomeWorthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "worth_edits",
      urlForEmails: "home_worths",
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      homeWorthEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: false,
      bannerImage: ""
    };
  }

  clickEdit = () => {
    this.state.hideDiv === false
      ? this.setState({ hideDiv: true })
      : this.setState({ hideDiv: false });
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
    const url = `/api/v1/${this.state.urlForEmails}`;
    const { name, email, phone, address, message } = this.state;
    const body = {
      name,
      email,
      phone,
      address,
      message
    };

    postFetchEmail(url, token, body)
      .then(this.scrollToTop)
      .catch(error => console.log(error.message));
  };

  mountState = body => {
    this.setState({
      homeWorthEditData: body,
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

  onSubmitEdit = event => {
    event.preventDefault();
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
    const token = document.querySelector('meta[name="csrf-token"]').content;

    putFetch(url, token, body)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  render() {
    const homeWorthEditForm = {
      bannerImage: "Banner Image",
      bannerText1: "Banner Text 1",
      bannerText2: "Banner Text 2",
      paragraph1: "Paragraph 1",
      paragraph2: "Paragraph 2"
    };

    let editForm = (
      <React.Fragment>
        {this.state.hideDiv ? (
          <div className="container">
            <form
              onSubmit={event => {
                this.onSubmitEdit(event);
                event.target.reset();
              }}
            >
              <FormMaps
                formConst={homeWorthEditForm}
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
        ) : null}
      </React.Fragment>
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
          <label htmlFor="address">
            Full Address for Comparative Market Analysis
          </label>
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
            <div className="container text-center py-3">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>
            </div>
          ) : null}

          <div className="container py-5">
            <div className="row">
              <WorthPhotoContainer
                user={this.props.user}
                hide={this.state.hideDiv}
              />

              <div className="col-sm-6">
                <FadeInRight>
                  <div>
                    <p className="pb-2">{this.state.paragraph1}</p>
                    <p className="pb-2">{this.state.paragraph2}</p>
                  </div>
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
