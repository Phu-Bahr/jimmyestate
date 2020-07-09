import React, { Component } from "react";
import EmailForm from "./EmailForm";
import Map from "./Map";
import {
  FadeInLeft,
  FadeInRight,
  ParallaxBannerRoutes,
  FormMaps
} from "../Constants/Constants";
import AlertBox from "../Constants/AlertComponent";
import { getFetch, putFetch, getGeocode } from "../Constants/FetchComponent";

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

  componentDidMount() {
    getFetch(urlPath, this.mountState);
  }

  componentDidUpdate() {
    this.state.refreshKey &&
      getFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  }

  mountLatLng = body => {
    this.setState({
      lat: body.data[0].lat,
      lng: body.data[0].lng
    });
  };

  onUpdateGeocode = () => {
    let location = `${this.state.address}`;
    getGeocode(location, this.mountLatLng, this.alertType);
  };

  render() {
    const bannerFormContent = {
      bannerImage: "Banner Image",
      headerText1: "Header text 1",
      headerText2: "Header text 2"
    };

    const dataFormContent = {
      name: "Name",
      address: "Address",
      phonenumber: "Phone Number",
      email: "Email",
      lat: "Latitude",
      lng: "Longitude"
    };

    let editMenu = (
      <React.Fragment>
        <div className="flex-container">
          <div className="container pb-5">
            <form onSubmit={this.onSubmit}>
              <div className="text-center pb-3">
                <button type="submit" className="btn custom-button">
                  Submit changes
                </button>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <FormMaps
                    formConst={bannerFormContent}
                    onChange={this.onChange}
                    value={this.state}
                  />
                </div>
                <div className="col-md-6">
                  <FormMaps
                    formConst={dataFormContent}
                    onChange={this.onChange}
                    value={this.state}
                  />
                  <div className="py-3">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={this.onUpdateGeocode}
                    >
                      Update Geocode
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state} />
          <div className="pt-5">{this.props.user.admin ? editMenu : null}</div>
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6 pb-3">
                <FadeInLeft>
                  <EmailForm />
                </FadeInLeft>
              </div>
              <div className="col-md-6">
                <FadeInRight>
                  <div className="text-center pb-3">
                    <div>{this.state.name}</div>
                    <div>{this.state.address}</div>
                    <div>{this.state.phonenumber}</div>
                    <div>{this.state.email}</div>
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
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactContainer;
