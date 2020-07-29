import React, { Component, Fragment } from "react";
import FooterEditOffice from "./FooterEditOffice";
import FooterEditContactUs from "./FooterEditContactUs";
import FooterEditSocial from "./FooterEditSocial";
import AlertBox from "../Constants/AlertComponent";
import { getFetch, putFetch } from "../Constants/FetchComponent";
import FooterEditForm from "./FooterEditForm";
import { Link } from "react-router-dom";

const urlPath = "footers";

class FooterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerData: [],
      refreshKey: false,
      hideDiv: true,
      name: "",
      street: "",
      citystate: "",
      contact1: "",
      contact2: "",
      contact3: "",
      contact4: "",
      facebook: "",
      twitter: "",
      instagram: "",
      other: "",
      zillow: "",
      realtor: "",
      refreshKey: false,
      typeOfAlert: null,
      id: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const {
      name,
      street,
      citystate,
      contact1,
      contact2,
      contact3,
      contact4,
      facebook,
      twitter,
      instagram,
      other,
      zillow,
      realtor
    } = this.state;

    const body = {
      name,
      street,
      citystate,
      contact1,
      contact2,
      contact3,
      contact4,
      facebook,
      twitter,
      instagram,
      other,
      zillow,
      realtor
    };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      footerData: body,
      name: body[body.length - 1].name,
      street: body[body.length - 1].street,
      citystate: body[body.length - 1].citystate,
      contact1: body[body.length - 1].contact1,
      contact2: body[body.length - 1].contact2,
      contact3: body[body.length - 1].contact3,
      contact4: body[body.length - 1].contact4,
      facebook: body[body.length - 1].facebook,
      twitter: body[body.length - 1].twitter,
      instagram: body[body.length - 1].instagram,
      other: body[body.length - 1].other,
      zillow: body[body.length - 1].zillow,
      realtor: body[body.length - 1].realtor,
      id: body[body.length - 1].id
    });
  };

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () => {
    this.state.refreshKey &&
      getFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  };

  render() {
    const footerData = this.state.footerData;

    let footerOfficeData = footerData.map(element => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-4 ">
          <h3 className="d-flex justify-content-center">OFFICE</h3>
          <FooterEditOffice
            key={element.id}
            id={element.id}
            name={element.name}
            street={element.street}
            citystate={element.citystate}
          />
        </div>
      );
    });

    let footerContactUsData = footerData.map(element => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-4">
          <h3 className="d-flex justify-content-center">CONTACT ME</h3>
          <FooterEditContactUs
            key={element.id}
            id={element.id}
            contact1={element.contact1}
            contact2={element.contact2}
            contact3={element.contact3}
            contact4={element.contact4}
          />
        </div>
      );
    });

    let footerSocialData = footerData.map(element => {
      return (
        <div className="col-xs-12 col-sm-4 col-md-4">
          <h3 className="d-flex justify-content-center">SOCIAL</h3>
          <FooterEditSocial
            key={element.id}
            id={element.id}
            facebook={element.facebook}
            twitter={element.twitter}
            instagram={element.instagram}
            other={element.other}
            zillow={element.zillow}
            realtor={element.realtor}
          />
        </div>
      );
    });

    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="footerbackground py-5">
          <div className="container">
            <div className="row">
              {footerOfficeData}
              {footerContactUsData}
              {footerSocialData}
            </div>
          </div>

          {this.props.user.admin && (
            <FooterEditForm
              clickEdit={this.clickEdit}
              value={this.state}
              {...this.state}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          )}

          <Link
            to="/login"
            className="float-left btn"
            style={{ height: 40, width: 40 }}
          />
        </div>
      </Fragment>
    );
  }
}

export default FooterContainer;
