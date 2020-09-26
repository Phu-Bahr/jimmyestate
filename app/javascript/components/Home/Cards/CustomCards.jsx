import React, { Component, Fragment } from "react";
import { FadeInDown } from "../../Constants/Constants";
import { Link } from "react-router-dom";
import CustomEditLinks from "./CustomEditLinks";
import { getNoScrollFetch } from "../../Constants/FetchComponent";
import { gaCards, gaLinks } from "../../Constants/GoogleAnalyticEvents";

const urlPathCustom = "custom_cards";
const urlPathPartner = "partner_categories";
const urlPathTowns = "towns";

class CustomCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible1: false,
      townListData: [],
      partnerListData: [],
      customCardListData: [],
      refreshKey: false
    };
  }

  toggleRefreshKey = () => this.setState({ refreshKey: true });

  onClick = () => {
    this.state.visible
      ? this.setState({ visible: false, visible1: false })
      : this.setState({ visible: true, visible1: false });
    gaCards("Featured Communities Card");
  };

  onClick1 = () => {
    this.state.visible1
      ? this.setState({ visible1: false, visible: false })
      : this.setState({ visible1: true, visible: false });
    gaCards("Business Partners Card");
  };

  mountStateTowns = body => {
    this.setState({ townListData: body });
  };

  mountStatePartner = body => {
    this.setState({ partnerListData: body });
  };

  mountStateCustom = body => {
    this.setState({ customCardListData: body });
  };

  componentDidMount = () => {
    getNoScrollFetch(urlPathTowns, this.mountStateTowns);
    getNoScrollFetch(urlPathPartner, this.mountStatePartner);
    getNoScrollFetch(urlPathCustom, this.mountStateCustom);
  };

  componentDidUpdate = () => {
    this.state.refreshKey &&
      getNoScrollFetch(urlPathCustom, this.mountStateCustom).then(
        this.setState({ refreshKey: false })
      );
  };

  render() {
    let townlist = this.state.townListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link
            to={`/${urlPathTowns}/${element.id}`}
            className="helperL py-1"
            onClick={() => gaLinks(`${element.name} from Featured Card`)}
          >
            {element.name}
          </Link>
        </div>
      );
    });

    let partnerlist = this.state.partnerListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link
            to={`/${urlPathPartner}/${element.id}`}
            className="helperL py-1"
            onClick={() => gaLinks(`${element.name} from Partners Card`)}
          >
            {element.name}
          </Link>
        </div>
      );
    });

    let communityCard = this.state.customCardListData.map(element => {
      if (element.id === 1) {
        return (
          <div
            key={element.id}
            className="col-md-12 col-lg-6 col-middle px-4 py-3"
            style={{ zIndex: 0 }}
          >
            <div
              className="card border-0 helper-card imageShadow"
              onClick={this.onClick}
            >
              <div className="parent m-0">
                <figure className="child particles">
                  <img
                    className="cardImage"
                    src={element.image}
                    alt="custom helper card image 1"
                  />
                  <figcaption className="cardTitle px-3 py-1">
                    {element.title}
                  </figcaption>
                </figure>
              </div>
            </div>

            {this.state.visible && (
              <FadeInDown>
                <div className="card-body cardDetails container">
                  <div className="row">{townlist}</div>
                </div>
              </FadeInDown>
            )}

            {this.props.user.admin && (
              <CustomEditLinks
                urlPathCustom={urlPathCustom}
                {...element}
                toggleRefreshKey={this.toggleRefreshKey}
                alertType={this.props.alertType}
              />
            )}
          </div>
        );
      }
    });

    let partnerCard = this.state.customCardListData.map(element => {
      if (element.id === 2) {
        return (
          <div
            key={element.id}
            className="col-md-12 col-lg-6 col-middle px-4 py-3"
            style={{ zIndex: 0 }}
          >
            <div
              className="card border-0 helper-card imageShadow"
              onClick={this.onClick1}
            >
              <div className="parent m-0">
                <figure className="child particles">
                  <img
                    className="cardImage"
                    src={element.image}
                    alt="custom helper card image 2"
                  />
                </figure>
                <div className="cardTitle px-3 py-1">{element.title}</div>
              </div>
            </div>

            {this.state.visible1 && (
              <FadeInDown>
                <div className="card-body cardDetails container">
                  <div className="row">{partnerlist}</div>
                </div>
              </FadeInDown>
            )}

            {this.props.user.admin && (
              <CustomEditLinks
                urlPathCustom={urlPathCustom}
                {...element}
                toggleRefreshKey={this.toggleRefreshKey}
                alertType={this.props.alertType}
              />
            )}
          </div>
        );
      }
    });

    return (
      <Fragment>
        {communityCard}
        {partnerCard}
      </Fragment>
    );
  }
}

export default CustomCards;
