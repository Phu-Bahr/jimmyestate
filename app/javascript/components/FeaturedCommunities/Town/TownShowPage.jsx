import React, { Component, Fragment } from "react";
import TownLinks from "./TownLinks/TownLinks";
import { FadeIn, ParallaxBannerRoutes } from "../../Constants/Constants";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch } from "../../Constants/FetchComponent";
import TownShowPageDraftJS from "./TownShowPageDraftJS";

const urlPath = "towns";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: null,
      refreshKey: false,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  mountState = body => this.setState({ townData: body, id: body.id });

  componentDidMount() {
    const url = `${urlPath}/${this.props.match.params.id}`;
    getFetch(url, this.mountState);
  }

  componentDidUpdate() {
    const url = `${urlPath}/${this.props.match.params.id}`;

    this.state.id != this.props.match.params.id &&
      getFetch(url, this.mountState).then(
        this.setState({ refreshKey: false, id: this.props.match.params.id })
      );
  }

  render() {
    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          paramsID={this.props.match.params.id}
        />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state.townData} id={this.state.id} />
          <FadeIn>
            <TownShowPageDraftJS
              admin={this.props.user.admin}
              paramsID={this.props.match.params.id}
              urlPath={urlPath}
            />

            <div className="container pb-5">
              <div className="townheader-font">
                {this.state.townData.townheader}
              </div>
              <ul>
                <TownLinks
                  loggedInStatus={this.props.loggedInStatus}
                  user={this.props.user}
                  paramID={this.props.match.params.id}
                />
              </ul>
            </div>
          </FadeIn>
        </div>
      </Fragment>
    );
  }
}

export default TownShowPage;
