import React, { Component } from "react";
import EmailForm from "./EmailForm";
import Map from "./Map";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ParallaxBannerRoutes,
  FormMaps
} from "../../Constants/Constants";
import { animateScroll as scroll } from "react-scroll";

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
      urlGET: "contact_edits",
      refreshKey: false,
      id: null
    };
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
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

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Content has been saved");
          return response.json();
        }
        alert("Error, not updated.");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .then(this.scrollToTop)
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    fetch(`/api/v1/${this.state.urlGET}`)
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
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey) {
      fetch(`api/v1/${this.state.urlGET}`)
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
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  onUpdateGeocode = () => {
    let location = `${this.state.address}`;

    fetch(`/api/v1/events/search?location=${location}`)
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
        if (body.data[0].result === "No Results") {
          alert("No such place for geocode, try again");
        } else {
          alert("Geocode updated");
          this.setState({
            lat: body.data[0].lat,
            lng: body.data[0].lng
          });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  };

  render() {
    console.log("contact state", this.state);

    let contactData = (
      <React.Fragment>
        <div>
          <div>{this.state.name}</div>
          <div>{this.state.address}</div>
          <div>{this.state.phonenumber}</div>
          <div>{this.state.email}</div>
        </div>
      </React.Fragment>
    );

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
        <div className="container pb-5">
          <form onSubmit={this.onSubmit}>
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
              </div>
            </div>

            <div className="text-center">
              <div>
                <button type="submit" className="btn custom-button">
                  Submit changes
                </button>
              </div>
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
          </form>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <FadeIn>
          <ParallaxBannerRoutes {...this.state} />
        </FadeIn>

        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 pb-3">
              <FadeInLeft>
                <EmailForm />
              </FadeInLeft>
            </div>
            <div className="col-md-6">
              <FadeInRight>
                <div className="text-center pb-3">{contactData}</div>
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

        {this.props.user.admin ? editMenu : null}
      </React.Fragment>
    );
  }
}

export default ContactContainer;
