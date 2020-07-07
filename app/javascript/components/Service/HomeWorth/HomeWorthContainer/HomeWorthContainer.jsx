import React, { Component, Fragment } from "react";
import WorthPhotoContainer from "./WorthPhotoContainer/WorthPhotoContainer";
import HomeWorthContentForm from "./HomeWorthContentForm";
import { getFetch, putFetch } from "../../../Constants/FetchComponent";
import { EditButton } from "../../../Constants/Buttons";
import AlertBox from "../../../Constants/AlertComponent";
import HomeWorthEmailForm from "./HomeWorthEmailForm";
import {
  FadeInRight,
  ParallaxBannerRoutes,
  LoadingScreen
} from "../../../Constants/Constants";

const urlPath = "worth_edits";

class HomeWorthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeWorthEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: false,
      bannerImage: "",
      id: null,
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

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
      homeWorthEditData: body,
      id: body[body.length - 1].id,
      bannerText1: body[body.length - 1].bannerText1,
      bannerText2: body[body.length - 1].bannerText2,
      paragraph1: body[body.length - 1].paragraph1,
      paragraph2: body[body.length - 1].paragraph2,
      bannerImage: body[body.length - 1].bannerImage,
      loading: false
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
      <Fragment>
        {this.state.typeOfAlert !== null && (
          <AlertBox {...this.state} alertType={this.alertType} />
        )}
        <div className="flex-container">
          {this.state.id == null ? (
            <LoadingScreen id={this.state.id} />
          ) : (
            <ParallaxBannerRoutes
              bannerImage={this.state.bannerImage}
              headerText1={this.state.bannerText1}
              headerText2={this.state.bannerText2}
              id={this.state.id}
            />
          )}

          {this.props.user.admin && (
            <div className="container text-center py-3">
              <EditButton onClick={this.clickEdit} />
            </div>
          )}

          <div className="container py-5">
            <div className="row">
              <WorthPhotoContainer
                user={this.props.user}
                hide={this.state.hideDiv}
              />

              <div className="col-sm-6">
                <FadeInRight>
                  <div>
                    <p className="pb-2">{this.state.paragraph1}</p>
                    <p className="pb-2">{this.state.paragraph2}</p>
                  </div>

                  <HomeWorthContentForm
                    {...this.state}
                    onChange={this.onChange}
                    onSubmitEdit={this.onSubmitEdit}
                    value={this.state}
                  />

                  <HomeWorthEmailForm alertType={this.alertType} />
                </FadeInRight>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HomeWorthContainer;
