import React, { Component, Fragment } from "react";
import { getFetch, putFetch } from "../../Constants/FetchComponent";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import AlertBox from "../../Constants/AlertComponent";
import {
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";

const urlPath = "buying_contents";

class BuyingHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText1: "",
      headerText2: "",
      id: null,
      bannerImage: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

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
    console.log("buying home state", this.state);

    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state} />
          {this.props.user.admin && (
            <ParallaxEditForm
              {...this.state}
              onChange={this.onChange}
              value={this.state}
              onSubmit={this.onSubmit}
            />
          )}

          <div>
            <DraftJSContainer
              {...this.state}
              {...this.props}
              urlPath={urlPath}
              uppertoggleRefreshKey={this.toggleRefreshKey}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BuyingHomeContainer;
