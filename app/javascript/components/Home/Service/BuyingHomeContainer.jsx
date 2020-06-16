import React, { Component } from "react";
import {
  FadeIn,
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";
import { Fetcher } from "../../Constants/FetchComponent";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import { animateScroll as scroll } from "react-scroll";

class BuyingHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "buying_contents",
      headerText1: "",
      headerText2: "",
      id: null,
      bannerImage: "",
      data: []
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;

    const body = {
      headerText1,
      headerText2,
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    Fetcher.putFetch(urls, token, body)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  mountState = body => {
    this.setState({
      data: body,
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      bannerImage: body[body.length - 1].bannerImage,
      id: body[body.length - 1].id
    });
  };

  componentDidMount() {
    let url = this.state.urlGET;
    Fetcher.getFetch(url)
      .then(body => {
        this.mountState(body);
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey) {
      const url = this.state.urlGET;
      Fetcher.getFetch(url)
        .then(body => {
          this.mountState(body);
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop)
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex-container">
          <FadeIn>
            <ParallaxBannerRoutes {...this.state} />
            {this.props.user.admin === true ? (
              <ParallaxEditForm
                {...this.state}
                onChange={this.onChange}
                value={this.state}
                onSubmit={this.onSubmit}
              />
            ) : (
              ""
            )}
          </FadeIn>

          <div>
            <DraftJSContainer {...this.state} {...this.props} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyingHomeContainer;
