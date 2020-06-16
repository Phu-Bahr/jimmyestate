import React, { Component } from "react";
import {
  FadeIn,
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import { animateScroll as scroll } from "react-scroll";
import { getFetch, putFetch } from "../../Constants/FetchComponent";

class SellingHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "selling_contents",
      headerText1: "",
      headerText2: "",
      id: null,
      bannerImage: ""
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

  mountState = body => {
    this.setState({
      data: body,
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      bannerImage: body[body.length - 1].bannerImage,
      id: body[body.length - 1].id
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;

    const body = {
      headerText1,
      headerText2,
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    putFetch(url, token, body)
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    getFetch(this.state.urlGET)
      .then(body => {
        this.mountState(body);
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      getFetch(this.state.urlGET)
        .then(body => {
          this.mountState(body);
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
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

export default SellingHomeContainer;
