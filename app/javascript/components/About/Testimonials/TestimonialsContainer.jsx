import React, { Component, Fragment } from "react";
import {
  ParallaxBannerRoutes,
  ParallaxEditForm,
  LoadingScreen
} from "../../Constants/Constants";
import Testimonials from "./Testimonials";
import { getFetch, putFetch } from "../../Constants/FetchComponent";
import AlertBox from "../../Constants/AlertComponent";
import { EditButton } from "../../Constants/Buttons";

const urlPath = "testimonial_edits";
class TestimonialsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText1: "",
      headerText2: "",
      bannerImage: "",
      id: null,
      hideDiv: false,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  editBanner = () => this.setState({ hideDiv: !this.state.hideDiv });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;
    const body = {
      headerText1,
      headerText2,
      bannerImage
    };
    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      bannerImage: body[body.length - 1].bannerImage,
      id: body[body.length - 1].id
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
          <ParallaxBannerRoutes {...this.state} />

          {this.props.user.admin && (
            <Fragment>
              <div className="container text-center pt-4">
                <EditButton onClick={this.editBanner} value="Edit Banner" />
              </div>

              {this.state.hideDiv && (
                <ParallaxEditForm
                  value={this.state}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
              )}
            </Fragment>
          )}

          <LoadingScreen {...this.state} />
          <Testimonials user={this.props.user} />
        </div>
      </Fragment>
    );
  }
}

export default TestimonialsContainer;
