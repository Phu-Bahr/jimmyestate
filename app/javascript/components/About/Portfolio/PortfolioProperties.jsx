import React, { Component, Fragment } from "react";
import { FadeIn } from "../../Constants/Constants";
import { PortfolioPropertyForm } from "./PortfolioPropertyForm";
import AlertBox from "../../Constants/AlertComponent";
import PortfolioPropertiesTile from "./PortfolioPropertiesTile";
import { EditButton } from "../../Constants/Buttons";
import {
  getFetch,
  postFetch,
  deleteFetch,
  putFetch
} from "../../Constants/FetchComponent";

const urlPath = "portfolios";

class PortfolioProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioData: [],
      id: null,
      refreshKey: false,
      photo: "",
      price: "",
      streetnumber: "",
      street: "",
      aptnumber: "",
      city: "",
      state: "",
      zip: "",
      status: "",
      hideDiv: false,
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  clearState = () => {
    this.setState({
      photo: "",
      price: "",
      streetnumber: "",
      street: "",
      aptnumber: "",
      city: "",
      state: "",
      zip: "",
      status: ""
    });
  };

  handleDelete = id => {
    this.setState({ idForAlert: id });
    this.alertType("delete");
  };

  handleEdit = editPayload => {
    this.setState({
      id: editPayload.id,
      photo: editPayload.photo,
      price: editPayload.price,
      streetnumber: editPayload.streetnumber,
      street: editPayload.street,
      aptnumber: editPayload.aptnumber,
      city: editPayload.city,
      state: editPayload.state,
      zip: editPayload.zip,
      status: editPayload.status
    });
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    deleteFetch(url, this.alertType).then(this.toggleRefreshKey);
  };

  onSubmit = event => {
    const {
      photo,
      price,
      streetnumber,
      street,
      aptnumber,
      city,
      state,
      zip,
      status
    } = this.state;

    const body = {
      photo,
      price,
      streetnumber,
      street,
      aptnumber,
      city,
      state,
      zip,
      status
    };
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;

    postFetch(url, body, this.alertType)
      .then(this.clearState)
      .then(this.toggleRefreshKey);
  };

  onSubmitEdit = () => {
    if (this.state.id == null) {
      alert("Nothing to edit");
    } else {
      event.preventDefault();
      const url = `/api/v1/${urlPath}/${this.state.id}`;
      const {
        photo,
        price,
        streetnumber,
        street,
        aptnumber,
        city,
        state,
        zip,
        status
      } = this.state;

      const body = {
        photo,
        price,
        streetnumber,
        street,
        aptnumber,
        city,
        state,
        zip,
        status
      };

      putFetch(url, body, this.alertType)
        .then(this.clearState)
        .then(this.toggleRefreshKey);
    }
  };

  mountState = body => this.setState({ portfolioData: body });

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    let data = this.state.portfolioData;

    const activeLogic = data => {
      let activeStatus = false;
      data.map(element => {
        if (element.status == "Active") {
          return (activeStatus = true);
        }
      });

      return activeStatus;
    };

    const propertyTile = status => {
      let displayActivePortfolio = data.map(element => {
        if (element.status == status) {
          return (
            <PortfolioPropertiesTile
              key={element.id}
              id={element.id}
              photo={element.photo}
              price={element.price}
              streetnumber={element.streetnumber}
              street={element.street}
              aptnumber={element.aptnumber}
              city={element.city}
              state={element.state}
              zip={element.zip}
              hide={this.state.hideDiv}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              status={element.status}
              user={this.props.user}
            />
          );
        }
      });
      return displayActivePortfolio;
    };

    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteEvent}
        />
        {this.props.user.admin && (
          <Fragment>
            <div className=" text-center pt-5" id="formTag">
              <EditButton onClick={this.clickEdit} />
            </div>

            {this.state.hideDiv && (
              <div className="container" id="formTag">
                <PortfolioPropertyForm
                  onChange={this.onChange}
                  value={this.state}
                  onSubmitEdit={this.onSubmitEdit}
                  onSubmit={this.onSubmit}
                />
              </div>
            )}
          </Fragment>
        )}

        <FadeIn>
          <div className="pt-5 text-center portHeaders">
            <div className="port-line-break"></div>
            <header>
              <h1>ACTIVE PROPERTIES</h1>
            </header>
            <div className="port-line-break"></div>
            {activeLogic(this.state.portfolioData) == false ? (
              <div className="empty-active-container">
                <div className="empty-active-prop">
                  None active at the moment.
                </div>
              </div>
            ) : (
              <div className="card-container-wrapper">
                <div className="card-container">{propertyTile("Active")}</div>
              </div>
            )}

            <div className="port-line-break"></div>
            <header>
              <h1>SOLD PROPERTIES</h1>
            </header>
            <div className="port-line-break"></div>

            <div className="card-container-wrapper">
              <div className="card-container">{propertyTile("Sold")}</div>
            </div>

            <div className="port-line-break"></div>
            <header>
              <h1>RENTED PROPERTIES</h1>
            </header>
            <div className="port-line-break"></div>

            <div className="card-container-wrapper">
              <div className="card-container">{propertyTile("Rental")}</div>
            </div>
          </div>
        </FadeIn>
      </Fragment>
    );
  }
}
export default PortfolioProperties;
