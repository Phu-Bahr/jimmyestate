import React, { Component, Fragment } from "react";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import AboutCompanyContentForm from "./AboutCompanyContentForm";
import AlertBox from "../../Constants/AlertComponent";
import { putFetch, getFetch } from "../../Constants/FetchComponent";
import {
  FadeInUp,
  ParallaxBannerRoutes,
  LoadingScreen
} from "../../Constants/Constants";

const urlPath = "about_companies";

class AboutCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText1: "",
      headerText2: "",
      image: "",
      id: null,
      bannerImage: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { headerText1, headerText2, image, bannerImage } = this.state;
    const body = { headerText1, headerText2, image, bannerImage };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      image: body[body.length - 1].image,
      id: body[body.length - 1].id,
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
          <LoadingScreen id={this.state.id} />

          <ParallaxBannerRoutes {...this.state} {...this.props} />

          <FadeInUp>
            <div className="pt-4 pb-3 px-4 text-center">
              <img
                className="img-fluid rounded"
                src={this.state.image}
                alt="RTN Logo Image"
              ></img>
            </div>
          </FadeInUp>

          {this.props.user.admin && (
            <AboutCompanyContentForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              value={this.state}
            />
          )}

          <DraftJSContainer
            {...this.state}
            {...this.props}
            urlPath={urlPath}
            uppertoggleRefreshKey={this.toggleRefreshKey}
          />
        </div>
      </Fragment>
    );
  }
}

export default AboutCompanyContainer;
