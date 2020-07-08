import React, { Component } from "react";
import PortfolioProperties from "./PortfolioProperties";
import AlertBox from "../../Constants/AlertComponent";
import {
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";
import { getFetch, putFetch } from "../../Constants/FetchComponent";

const urlPath = "portfolio_edits";

class PortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerImage: "",
      headerText1: "",
      headerText2: "",
      id: null,
      refreshKey: false,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { bannerImage, headerText1, headerText2 } = this.state;
    const body = { bannerImage, headerText1, headerText2 };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      bannerImage: body[body.length - 1].bannerImage,
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
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
    return (
      <React.Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state} />
          {this.props.user.admin && (
            <ParallaxEditForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              value={this.state}
            />
          )}
          <PortfolioProperties {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default PortfolioContainer;
