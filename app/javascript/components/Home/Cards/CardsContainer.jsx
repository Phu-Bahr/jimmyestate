import React, { Component, Fragment } from "react";
import HelperLinks from "./HelperLinks";
import NewHelperCard from "./NewHelperCard";
import CardsContainerEdit from "./CardsContainerEdit";
import CustomCards from "./CustomCards";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import AlertBox from "../../Constants/AlertComponent";
import {
  getNoScrollFetch,
  deleteNoScrollFetch
} from "../../Constants/FetchComponent";

const urlPathDraft = "card_drafts";
const urlPath = "helper_links";

class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperListData: [],
      selectedStepId: null,
      refreshKey: false,
      bannerImage: "",
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  deleteCard = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    deleteNoScrollFetch(url, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => this.setState({ helperListData: body });

  componentDidMount = () => getNoScrollFetch(urlPath, this.mountState);

  componentDidUpdate = () => {
    this.state.refreshKey &&
      getNoScrollFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  };

  handleClick = id => {
    this.setState({ idForAlert: id });
    this.alertType("delete");
  };

  render() {
    let cards = this.state.helperListData.map(element => {
      return (
        <HelperLinks
          key={element.id}
          id={element.id}
          image={element.image}
          title={element.title}
          route={element.route}
          handleClick={this.handleClick}
          toggleRefreshKey={this.toggleRefreshKey}
          user={this.props.user}
          urlPath={urlPath}
          alertType={this.alertType}
        />
      );
    });

    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteCard}
        />

        <CardsContainerEdit user={this.props.user} alertType={this.alertType} />

        <DraftJSContainer
          {...this.state}
          {...this.props}
          hocRefresh={this.toggleRefreshKey}
          urlPath={urlPathDraft}
        />

        <div className="container pb-5 pt-2 px-5">
          {this.props.user.admin && (
            <NewHelperCard
              toggleRefreshKey={this.toggleRefreshKey}
              alertType={this.alertType}
            />
          )}

          <div className="row">
            <CustomCards user={this.props.user} alertType={this.alertType} />
            {cards}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CardsContainer;
