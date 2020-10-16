import React, { Component, Fragment } from "react";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch, putFetch } from "../../Constants/FetchComponent";
import AboutContainerForm from "./AboutContainerForm";
import AboutJimmyContent from "./AboutJimmyContent";
import AboutJimmyPhotoContainer from "./AboutJimmyPhotoContainer";
import { EditButton } from "../../Constants/Buttons";
import {
  FadeInUp,
  ParallaxBannerRoutes,
  LoadingScreen,
  FadeIn
} from "../../Constants/Constants";

const urlPath = "abouts";

class AboutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutData: [],
      id: null,
      bannerText1: "",
      bannerText2: "",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      paragraph5: "",
      paragraph6: "",
      paragraph7: "",
      paragraph8: "",
      photo: "",
      photoname: "",
      photonumber: "",
      photoemail: "",
      photoaddress1: "",
      photoaddress2: "",
      refreshKey: false,
      hideDiv: false,
      bannerImage: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      photo,
      photoname,
      photonumber,
      photoemail,
      photoaddress1,
      photoaddress2,
      bannerImage
    } = this.state;

    const body = {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      photo,
      photoname,
      photonumber,
      photoemail,
      photoaddress1,
      photoaddress2,
      bannerImage
    };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      aboutData: body,
      id: body[body.length - 1].id,
      bannerText1: body[body.length - 1].bannerText1,
      bannerText2: body[body.length - 1].bannerText2,
      paragraph1: body[body.length - 1].paragraph1,
      paragraph2: body[body.length - 1].paragraph2,
      paragraph3: body[body.length - 1].paragraph3,
      paragraph4: body[body.length - 1].paragraph4,
      paragraph5: body[body.length - 1].paragraph5,
      paragraph6: body[body.length - 1].paragraph6,
      paragraph7: body[body.length - 1].paragraph7,
      paragraph8: body[body.length - 1].paragraph8,
      photo: body[body.length - 1].photo,
      photoname: body[body.length - 1].photoname,
      photonumber: body[body.length - 1].photonumber,
      photoemail: body[body.length - 1].photoemail,
      photoaddress1: body[body.length - 1].photoaddress1,
      photoaddress2: body[body.length - 1].photoaddress2,
      bannerImage: body[body.length - 1].bannerImage
    });
  };

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes
            bannerImage={this.state.bannerImage}
            headerText1={this.state.bannerText1}
            headerText2={this.state.bannerText2}
            id={this.state.id}
          />

          <LoadingScreen {...this.state} />

          <main className="container-fluid py-5 about-container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-4 col-xl-3">
                <FadeIn>
                  <AboutJimmyPhotoContainer {...this.state} />
                </FadeIn>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9">
                <FadeInUp>
                  <AboutJimmyContent {...this.state} />
                </FadeInUp>
              </div>
            </div>
          </main>

          {this.props.user.admin && (
            <div className="container text-center pb-3">
              <EditButton onClick={this.clickEdit} />
            </div>
          )}

          <AboutContainerForm
            hideDiv={this.state.hideDiv}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={this.state}
            admin={this.props.user.admin}
          />
        </div>
      </Fragment>
    );
  }
}

export default AboutContainer;
