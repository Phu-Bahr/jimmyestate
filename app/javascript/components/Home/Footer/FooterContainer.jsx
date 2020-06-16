import React, { Component } from "react";
import FooterEditOffice from "./FooterEditOffice";
import FooterEditContactUs from "./FooterEditContactUs";
import FooterEditSocial from "./FooterEditSocial";
import { Link } from "react-router-dom";
import { FormNoLabel } from "../../Constants/Constants";

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
      url: "footers"
    };

    this.clickEdit = this.clickEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  clickEdit() {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/${this.state.url}/1`;
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
    console.log("body in edit submit", body);

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch(`/api/v1/${this.state.url}`)
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
        let newFooterData = body;
        this.setState({ footerData: newFooterData });
        this.setState({
          name: body[0].name,
          street: body[0].street,
          citystate: body[0].citystate,
          contact1: body[0].contact1,
          contact2: body[0].contact2,
          contact3: body[0].contact3,
          contact4: body[0].contact4,
          facebook: body[0].facebook,
          twitter: body[0].twitter,
          instagram: body[0].instagram,
          other: body[0].other,
          zillow: body[0].zillow,
          realtor: body[0].realtor
        });
      })
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch(`api/v1/${this.state.url}`)
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
          console.log("didupdate body data", body);

          let newFooter = body;
          this.setState({ footerData: newFooter });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    let hide;
    if (this.state.hideDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    const footerData = this.state.footerData;

    let footerOfficeData = footerData.map(element => {
      return (
        <FooterEditOffice
          key={element.id}
          id={element.id}
          name={element.name}
          street={element.street}
          citystate={element.citystate}
        />
      );
    });

    let footerContactUsData = footerData.map(element => {
      return (
        <FooterEditContactUs
          key={element.id}
          id={element.id}
          contact1={element.contact1}
          contact2={element.contact2}
          contact3={element.contact3}
          contact4={element.contact4}
        />
      );
    });

    let footerSocialData = footerData.map(element => {
      return (
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
      );
    });

    const officeData = {
      name: "name",
      street: "street",
      citystate: "citystate"
    };

    const contactData = {
      contact1: "contact1",
      contact2: "contact2",
      contact3: "contact3",
      contact4: "contact4"
    };

    const socialData = {
      facebook: "facebook",
      twitter: "twitter",
      instagram: "instagram",
      other: "other",
      zillow: "zillow",
      realtor: "realtor"
    };

    let editForm = (
      <React.Fragment>
        <div className="col-sm-12 mt-5 text-center">
          <button
            type="button"
            className="btn btn-info"
            onClick={this.clickEdit}
          >
            Edit
          </button>
        </div>
        <div className={"container" + " " + hide}>
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form
                onSubmit={event => {
                  this.onSubmit(event);
                  event.target.reset();
                }}
              >
                <FormNoLabel
                  data={officeData}
                  onChange={this.onChange}
                  value={this.state}
                />
                <button type="submit" className="btn custom-button mt-n3">
                  Edit Office
                </button>
              </form>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form
                onSubmit={event => {
                  this.onSubmit(event);
                  event.target.reset();
                }}
              >
                <FormNoLabel
                  data={contactData}
                  onChange={this.onChange}
                  value={this.state}
                />
                <button type="submit" className="btn custom-button mt-n3">
                  Edit Contact Info
                </button>
              </form>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form
                onSubmit={event => {
                  this.onSubmit(event);
                  event.target.reset();
                }}
              >
                <FormNoLabel
                  data={socialData}
                  onChange={this.onChange}
                  value={this.state}
                />
                <button type="submit" className="btn custom-button mt-n3">
                  Edit Social
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <div className="footerbackground py-5">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4 ">
                <h3 className="d-flex justify-content-center">OFFICE</h3>
                {footerOfficeData}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h3 className="d-flex justify-content-center">CONTACT ME</h3>
                {footerContactUsData}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h3 className="d-flex justify-content-center">SOCIAL</h3>
                {footerSocialData}
              </div>
            </div>
          </div>

          {this.props.user.admin ? editForm : null}

          <Link
            to="/login"
            className="float-left btn"
            style={{ height: 40, width: 40 }}
          ></Link>
        </div>
      </React.Fragment>
    );
  }
}

export default FooterContainer;
