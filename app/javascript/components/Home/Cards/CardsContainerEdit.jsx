import React, { Component, Fragment } from "react";
import { ParallaxBanner, FormMaps } from "../../Constants/Constants";
import ScrollAnimation from "react-animate-on-scroll";
import {
  getNoScrollFetch,
  putNoScrollFetch
} from "../../Constants/FetchComponent";
import { UpdateButton } from "../../Constants/Buttons";
import BioContainer from "./BioContainer";

const urlPath = "venue_templates";

class CardsContainerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerImage: "",
      headerText1: "",
      headerText2: "",
      id: null,
      refreshKey: false,
      image: ""
    };
  }

  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage, image } = this.state;
    const body = { headerText1, headerText2, bannerImage, image };

    putNoScrollFetch(url, body, this.props.alertType).then(
      this.toggleRefreshKey
    );
  };

  mountState = body => {
    this.setState({
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      id: body[body.length - 1].id,
      bannerImage: body[body.length - 1].bannerImage,
      image: body[body.length - 1].image
    });
  };

  componentDidMount = () => getNoScrollFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getNoScrollFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    let contentInfo = {
      bannerImage: "Banner Image",
      image: "Image"
    };

    let bannerForm = (
      <div className="container pt-5">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 pb-5">
            <form onSubmit={this.onSubmit}>
              <FormMaps
                onChange={this.onChange}
                value={this.state}
                formConst={contentInfo}
              />

              <UpdateButton />
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <Fragment>
        <ScrollAnimation animateIn="fadeIn">
          <ParallaxBanner {...this.state} />

          {this.props.user.admin && bannerForm}

          <figure className="text-center py-5 card-photo-background">
            <img
              className="img_wrapper about_img_style rounded"
              src={this.state.image}
              alt="Home page bio of Jimmy"
            />
          </figure>

          <BioContainer
            alertType={this.props.alertType}
            user={this.props.user}
          />
        </ScrollAnimation>
      </Fragment>
    );
  }
}

export default CardsContainerEdit;
