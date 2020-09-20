import React, { Component, Fragment } from "react";
import EmailForm from "./EmailForm";
import Map from "./Map";
import {
  FadeInLeft,
  FadeInRight,
  ParallaxBannerRoutes
} from "../Constants/Constants";
import AlertBox from "../Constants/AlertComponent";
import { getFetch, putFetch, getGeocode } from "../Constants/FetchComponent";
import ContactContentForm from "./ContactContentForm";
import { gaContactLinks } from "../Constants/GoogleAnalyticEvents";

const urlPath = "contact_edits";

class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
      geoData: [],
      bannerImage: "",
      headerText1: "",
      headerText2: "",
      name: "",
      address: "",
      phonenumber: "",
      email: "",
      lat: "",
      lng: "",
      refreshKey: false,
      id: null,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const {
      headerText1,
      headerText2,
      image,
      bannerImage,
      name,
      address,
      phonenumber,
      email,
      lat,
      lng
    } = this.state;

    const body = {
      headerText1,
      headerText2,
      image,
      bannerImage,
      name,
      address,
      phonenumber,
      email,
      lat,
      lng
    };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      contactData: body,
      bannerImage: body[body.length - 1].bannerImage,
      headerText1: body[body.length - 1].headerText1,
      headerText2: body[body.length - 1].headerText2,
      name: body[body.length - 1].name,
      address: body[body.length - 1].address,
      phonenumber: body[body.length - 1].phonenumber,
      email: body[body.length - 1].email,
      lat: body[body.length - 1].lat,
      lng: body[body.length - 1].lng,
      id: body[body.length - 1].id
    });
  };

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  mountLatLng = body => {
    this.setState({ lat: body.data[0].lat, lng: body.data[0].lng });
  };

  onUpdateGeocode = () => {
    let location = `${this.state.address}`;
    getGeocode(location, this.mountLatLng, this.alertType);
  };

  render() {
    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state} />
          {this.props.user.admin && (
            <div className="pt-5">
              <ContactContentForm
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                value={this.state}
                onUpdateGeocode={this.onUpdateGeocode}
              />
            </div>
          )}

          <main className="container py-5">
            <div className="row">
              <section className="col-md-6 pb-5">
                <FadeInLeft>
                  <EmailForm alertType={this.alertType} />
                </FadeInLeft>
              </section>

              <section className="col-md-6">
                <FadeInRight>
                  <div className="p-3 contact-info-wrapper">
                    <div>{this.state.name}</div>
                    <div>{this.state.address}</div>
                    <div>
                      <a
                        href={`tel: ` + this.state.phonenumber}
                        onClick={() => gaContactLinks("Phone Contact Page")}
                      >
                        <div className="fa fa-phone pr-2 contact-icons" />
                        {this.state.phonenumber}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`mailto:` + this.state.email}
                        onClick={() => gaContactLinks("Phone Contact Page")}
                      >
                        <div className="fa fa-envelope pr-2 contact-icons" />
                        {this.state.email}
                      </a>
                    </div>
                  </div>
                </FadeInRight>
                <div>
                  <FadeInRight>
                    <Map
                      lat={parseFloat(this.state.lat)}
                      lng={parseFloat(this.state.lng)}
                    />
                  </FadeInRight>
                </div>
              </section>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default ContactContainer;
