import React, { Component } from "react";
import { FadeIn } from "../../Constants/Constants";
import { Link } from "react-router-dom";
import CustomEditLinks from "./CustomEditLinks";

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

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  onClick = () => {
    this.state.visible
      ? this.setState({ visible: false, visible1: false })
      : this.setState({ visible: true, visible1: false });
  };

  onClick1 = () => {
    this.state.visible1
      ? this.setState({ visible1: false, visible: false })
      : this.setState({ visible1: true, visible: false });
  };

  componentDidMount = () => {
    this.fetchTownList();
    this.fetchPartnerList();
    this.fetchCustomCardList();
  };

  componentDidUpdate = () => {
    this.fetchUpdateCustomCard();
  };

  fetchUpdateCustomCard() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/custom_cards")
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ customCardListData: body });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  fetchTownList() {
    fetch("/api/v1/towns")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ townListData: body });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  fetchPartnerList() {
    fetch("/api/v1/partner_categories")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ partnerListData: body });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  fetchCustomCardList() {
    fetch("/api/v1/custom_cards")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ customCardListData: body });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    let townlist = this.state.townListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link to={`/towns/${element.id}`} className="helperL py-1">
            {element.name}
          </Link>
        </div>
      );
    });

    let partnerlist = this.state.partnerListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link
            to={`/partner_categories/${element.id}`}
            className="helperL py-1"
          >
            {element.name}
          </Link>
        </div>
      );
    });

    let communityCard = this.state.customCardListData.map(element => {
      if (element.id === 1) {
        return (
          <div key={element.id} className="col-md-6 col-middle py-2">
            <div className="card border-0" onClick={this.onClick}>
              <div className="parent m-0">
                <div className="child particles">
                  <img
                    className="venueImage card-img-top"
                    src={element.image}
                  />
                  <div className="venueTitle">{element.title}</div>
                </div>
              </div>
            </div>

            {this.state.visible ? (
              <FadeIn>
                <div className="card-body venueDetails container">
                  <div className="row">{townlist}</div>
                </div>
              </FadeIn>
            ) : null}

            {this.props.user.admin ? (
              <CustomEditLinks
                {...element}
                toggleRefreshKey={this.toggleRefreshKey}
              />
            ) : null}
          </div>
        );
      }
    });

    let partnerCard = this.state.customCardListData.map(element => {
      if (element.id === 2) {
        return (
          <div key={element.id} className="col-md-6 col-middle py-2">
            <div className="card border-0" onClick={this.onClick1}>
              <div className="parent m-0">
                <div className="child particles">
                  <img
                    className="venueImage card-img-top"
                    src={element.image}
                  />
                  <div className="venueTitle">{element.title}</div>
                </div>
              </div>
            </div>

            {this.state.visible1 ? (
              <FadeIn>
                <div className="card-body venueDetails container">
                  <div className="row">{partnerlist}</div>
                </div>
              </FadeIn>
            ) : null}

            {this.props.user.admin ? (
              <CustomEditLinks
                {...element}
                toggleRefreshKey={this.toggleRefreshKey}
              />
            ) : null}
          </div>
        );
      }
    });

    return (
      <React.Fragment>
        {communityCard}
        {partnerCard}
      </React.Fragment>
    );
  }
}

export default CustomCards;
