import React, { Component, Fragment } from "react";
import MarketPhotoContainer from "./MarketPhotoContainer/MarketPhotoContainer";
import AlertBox from "../../Constants/AlertComponent";
import MarketReportsContentForm from "./MarketReportsContentForm";
import MarketReportsEmailForm from "./MarketReportsEmailForm";
import { putFetch, getFetch } from "../../Constants/FetchComponent";
import { FadeInLeft, ParallaxBannerRoutes } from "../../Constants/Constants";
import { EditButton } from "../../Constants/Buttons";

const urlPath = "market_report_edits";

class MarketReportsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: false,
      bannerImage: "",
      id: null,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitEdit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      bannerImage
    } = this.state;

    const body = {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      bannerImage
    };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      marketEditData: body,
      id: body[body.length - 1].id,
      bannerText1: body[body.length - 1].bannerText1,
      bannerText2: body[body.length - 1].bannerText2,
      paragraph1: body[body.length - 1].paragraph1,
      paragraph2: body[body.length - 1].paragraph2,
      bannerImage: body[body.length - 1].bannerImage
    });
  };

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes
            bannerImage={this.state.bannerImage}
            headerText1={this.state.bannerText1}
            headerText2={this.state.bannerText2}
            id={this.state.id}
          />

          {this.props.user.admin && (
            <div className="container py-3">
              <div className="row">
                <div className="col text-center">
                  <EditButton onClick={this.clickEdit} />
                </div>
              </div>
            </div>
          )}

          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12 col-md-6 pb-3">
                <FadeInLeft>
                  <p className="pb-2">{this.state.paragraph1}</p>
                  <p className="pb-2">{this.state.paragraph2}</p>

                  {this.props.user.admin && (
                    <Fragment>
                      {this.state.hideDiv && (
                        <MarketReportsContentForm
                          onSubmitEdit={this.onSubmitEdit}
                          onChange={this.onChange}
                          value={this.state}
                        />
                      )}
                    </Fragment>
                  )}
                  <MarketReportsEmailForm alertType={this.alertType} />
                </FadeInLeft>
              </div>
              <MarketPhotoContainer
                user={this.props.user}
                hide={this.state.hideDiv}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MarketReportsContainer;
