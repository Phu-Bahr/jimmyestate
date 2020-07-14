import React, { Component, Fragment } from "react";
import { FadeIn, ParallaxBannerRoutes } from "../Constants/Constants";
import DraftJSShowPage from "../Constants/DraftJSShowPage";
import { getFetch } from "../Constants/FetchComponent";
import AlertBox from "../Constants/AlertComponent";

const urlPath = "partner_categories";
const editUrlPath = "edit-partner-category";

class PartnerShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerData: {},
      id: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  mountState = body => this.setState({ partnerData: body, id: body.id });

  componentDidMount = () => {
    const url = `${urlPath}/${this.props.match.params.id}`;
    getFetch(url, this.mountState);
  };

  componentDidUpdate = () => {
    const url = `${urlPath}/${this.props.match.params.id}`;

    this.state.id != this.props.match.params.id &&
      getFetch(url, this.mountState).then(
        this.setState({ id: this.props.match.params.id })
      );
  };

  render() {
    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          paramsID={this.props.match.params.id}
        />
        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state.partnerData} />
          <FadeIn>
            <DraftJSShowPage
              paramsID={this.props.match.params.id}
              admin={this.props.user.admin}
              urlPath={urlPath}
              editUrlPath={editUrlPath}
            />

            <div className="container pb-5">
              <div className="townheader-font">
                {this.state.partnerData.townheader}
              </div>
            </div>
          </FadeIn>
        </div>
      </Fragment>
    );
  }
}

export default PartnerShowPage;
