import React, { Component } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import WorthPhotoContainer from "./WorthPhotoContainer/WorthPhotoContainer";
import HomeWorthContentForm from "./HomeWorthContentForm";
import {
  FadeIn,
  FadeInRight,
  ParallaxBannerRoutes
} from "../../../Constants/Constants";
import {
  getFetch,
  putFetch,
  postFetchEmail
} from "../../../Constants/FetchComponent";
import { EditButton, SubmitEmailButton } from "../../../Constants/Buttons";
import AlertBox from "../../../Constants/AlertComponent";

const urlPath = "worth_edits";
const urlPathForEmails = "home_worths";

class HomeWorthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      bannerImage: "",
      id: "",
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  onResolved = () => console.log("Captcha all set");
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  onSubmit = event => {
    event.preventDefault();
    this.recaptcha.execute();
    const url = `/api/v1/${urlPathForEmails}`;
    const { name, email, phone, address, message } = this.state;
    const body = {
      name,
      email,
      phone,
      address,
      message
    };

    postFetchEmail(url, body, this.alertType).then(this.scrollToTop);
  };

  onSubmitEdit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
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

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
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
    getFetch(urlPath, this.mountState);
  }

  componentDidUpdate() {
    this.state.refreshKey &&
      getFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  }

  render() {
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
        {this.state.typeOfAlert !== null && (
          <AlertBox {...this.state} alertType={this.alertType} />
        )}
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
              <EditButton onClick={this.clickEdit} />
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

                  <HomeWorthContentForm
                    {...this.state}
                    onChange={this.onChange}
                    onSubmitEdit={this.onSubmitEdit}
                    value={this.state}
                  />

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
