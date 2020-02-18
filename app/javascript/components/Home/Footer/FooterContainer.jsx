import React, { Component } from "react";
import FooterEditOffice from "./FooterEditOffice";
import FooterEditContactUs from "./FooterEditContactUs";
import FooterEditSocial from "./FooterEditSocial";
import { Link } from "react-router-dom";

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
      refreshKey: false
    };

    this.clickEdit = this.clickEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  clickEdit(event) {
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
    const urls = "/api/v1/footers/1";
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
      other
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
      other
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
    fetch("/api/v1/footers")
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
          other: body[0].other
        });
      })
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/footers")
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
        />
      );
    });

    return (
      <div id="contactTag">
        <div className="footerbackground py-5">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4 ">
                <h3 className="d-flex justify-content-center">OFFICE</h3>
                {footerOfficeData}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h3 className="d-flex justify-content-center">CONTACT US</h3>
                {footerContactUsData}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h3 className="d-flex justify-content-center">SOCIAL</h3>
                {footerSocialData}
              </div>
            </div>
          </div>

          <div className={this.props.hideEditButton}>
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
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.name}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.street}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="citystate"
                        id="citystate"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.citystate}
                      />
                    </div>
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
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact1"
                        id="contact1"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.contact1}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact2"
                        id="contact2"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.contact2}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact3"
                        id="contact3"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.contact3}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact4"
                        id="contact4"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.contact4}
                      />
                    </div>
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
                    <div className="form-group">
                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.facebook}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.twitter}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.instagram}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="other"
                        id="other"
                        className="form-control"
                        onChange={this.onChange}
                        placeholder={this.state.other}
                      />
                    </div>
                    <button type="submit" className="btn custom-button mt-n3">
                      Edit Social
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/login"
            className="float-left btn"
            style={{ height: 40, width: 40 }}
            onClick={this.props.adminMode}
          ></Link>
        </div>
      </div>
    );
  }
}

export default FooterContainer;
