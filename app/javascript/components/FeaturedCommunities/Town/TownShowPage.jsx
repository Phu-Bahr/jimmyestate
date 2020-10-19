import React, { Component, Fragment } from "react";
import TownLinks from "./TownLinks/TownLinks";
import { FadeIn, ParallaxBannerRoutes } from "../../Constants/Constants";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch } from "../../Constants/FetchComponent";
import DraftJSShowPage from "../../Constants/DraftJSShowPage";

const urlPath = "towns";
const editUrlPath = "editcommunity";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: null,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  mountState = body => {
    this.setState({ townData: body, id: body.id }), console.log(body);
  };

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
          <ParallaxBannerRoutes {...this.state.townData} id={this.state.id} />
          <FadeIn>
            <DraftJSShowPage
              paramsID={this.props.match.params.id}
              admin={this.props.user.admin}
              urlPath={urlPath}
              editUrlPath={editUrlPath}
            />

            <aside className="container px-5 pb-4">
              <header>
                <h1 className="townheader-font">
                  {this.state.townData.townheader}
                </h1>
              </header>
              <ul>
                <TownLinks
                  loggedInStatus={this.props.loggedInStatus}
                  user={this.props.user}
                  paramID={this.props.match.params.id}
                  townName={this.state.townData.name}
                />
              </ul>
            </aside>
          </FadeIn>
        </div>
      </Fragment>
    );
  }
}

export default TownShowPage;
