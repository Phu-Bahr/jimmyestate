import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import { FadeIn, FadeInUp } from "../../../components/Constants/Constants";
import ScrollAnimation from "react-animate-on-scroll";

class PortfolioContainer extends Component {
  constructor() {
    super();
    this.state = {
      portfolioData: [],
      propertyID: "",
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
      hideDiv: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.toggleRefreshKeyFalse = this.toggleRefreshKeyFalse.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

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

  clickEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  toggleRefreshKeyFalse(event) {
    this.setState({ refreshKey: false });
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/portfolios";
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

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(alert("Property has been added."))
      .then(this.toggleRefreshKey)
      .then(this.clearState)
      .catch(error => console.log(error.message));
  }

  deleteEvent(id) {
    const urls = `/api/v1/portfolios/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
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

  onSubmitEdit() {
    if (this.state.propertyID === "") {
      alert("Nothing to edit");
    } else {
      event.preventDefault();
      const urls = `/api/v1/portfolios/${this.state.propertyID}`;
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
            let errorMessage = `${resopnse.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(alert("Property has been updated."))
        .then(this.clearState)
        .then(this.toggleRefreshKey)
        .catch(error => console.log(error.message));
    }
  }

  componentDidMount() {
    fetch("/api/v1/portfolios")
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
        let newPortfolioData = body;
        this.setState({
          portfolioData: newPortfolioData
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/portfolios")
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
          let newPortfolioData = body;
          this.setState({
            portfolioData: newPortfolioData
          });
        })
        .then(this.toggleRefreshKeyFalse)
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
    console.log("state", this.state);

    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      // set below to blank string to default show edit buttons
      hideEditButton = "invisible";
    }

    let hide;
    if (this.state.hideDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let data = this.state.portfolioData;

    let displayActivePortfolio = data.map(element => {
      let handleDelete = () => {
        let result = confirm(
          `Are you sure you want to delete ${element.streetnumber} ${element.street}`
        );
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      let handleEdit = () => {
        this.setState({
          propertyID: element.id,
          photo: element.photo,
          price: element.price,
          streetnumber: element.streetnumber,
          street: element.street,
          aptnumber: element.aptnumber,
          city: element.city,
          state: element.state,
          zip: element.zip,
          status: element.status
        });
        this.scrollToTop();
      };

      if (element.status === "Active") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
            <ScrollAnimation animateIn="fadeIn">
              <div className="card border-0">
                <div className="parent1 m-0">
                  <div className="child1 particles">
                    <img
                      className="portfolioImage card-img-top"
                      src={element.photo}
                    />
                    <div className="portfolioTitle">On Market</div>
                  </div>
                </div>

                <div className="card-body">
                  <div style={{ fontWeight: "900" }}>
                    $
                    {element.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}
                  </div>
                  <div>{`${element.streetnumber} ${element.street} ${element.aptnumber}`}</div>
                  <div>{`${element.city}, ${element.state} ${element.zip}`}</div>
                </div>
              </div>
            </ScrollAnimation>

            <div className={"container" + " " + hide}>
              <div className="row">
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDelete}
                  >
                    Delete Property
                  </button>
                </div>
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleEdit}
                  >
                    Edit Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    let displaySoldPortfolio = data.map(element => {
      let handleDelete = () => {
        let result = confirm(
          `Are you sure you want to delete ${element.streetnumber} ${element.street}`
        );
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      let handleEdit = () => {
        this.setState({
          propertyID: element.id,
          photo: element.photo,
          price: element.price,
          streetnumber: element.streetnumber,
          street: element.street,
          aptnumber: element.aptnumber,
          city: element.city,
          state: element.state,
          zip: element.zip,
          status: element.status
        });
        this.scrollToTop();
      };

      if (element.status === "Sold") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
            <ScrollAnimation animateIn="fadeIn">
              <div className="card border-0">
                <div className="parent1 m-0">
                  <div className="child1 particles">
                    <img
                      className="portfolioImage card-img-top"
                      src={element.photo}
                    />
                    <div className="portfolioTitle">SOLD</div>
                  </div>
                </div>

                <div className="card-body">
                  <div style={{ fontWeight: "900" }}>
                    $
                    {element.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}
                  </div>
                  <div>{`${element.streetnumber} ${element.street} ${element.aptnumber}`}</div>
                  <div>{`${element.city}, ${element.state} ${element.zip}`}</div>
                </div>
              </div>
            </ScrollAnimation>

            <div className={"container" + " " + hide}>
              <div className="row">
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDelete}
                  >
                    Delete Property
                  </button>
                </div>
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleEdit}
                  >
                    Edit Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    let displayRentalPortfolio = data.map(element => {
      let handleDelete = () => {
        let result = confirm(
          `Are you sure you want to delete ${element.streetnumber} ${element.street}`
        );
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      let handleEdit = () => {
        this.setState({
          propertyID: element.id,
          photo: element.photo,
          price: element.price,
          streetnumber: element.streetnumber,
          street: element.street,
          aptnumber: element.aptnumber,
          city: element.city,
          state: element.state,
          zip: element.zip,
          status: element.status
        });
        this.scrollToTop();
      };

      if (element.status === "Rental") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
            <ScrollAnimation animateIn="fadeIn">
              <div className="card border-0">
                <div className="parent1 m-0">
                  <div className="child1 particles">
                    <img
                      className="portfolioImage card-img-top"
                      src={element.photo}
                    />
                    <div className="portfolioTitle">Rental</div>
                  </div>
                </div>

                <div className="card-body">
                  <div style={{ fontWeight: "900" }}>
                    $
                    {element.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0
                    })}
                  </div>
                  <div>{`${element.streetnumber} ${element.street} ${element.aptnumber}`}</div>
                  <div>{`${element.city}, ${element.state} ${element.zip}`}</div>
                </div>
              </div>
            </ScrollAnimation>

            <div className={"container" + " " + hide}>
              <div className="row">
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDelete}
                  >
                    Delete Property
                  </button>
                </div>
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleEdit}
                  >
                    Edit Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxAboutPortfolioPage darken-pseudo darken-with-text">
            <h1 className="text-center caption">PORTFOLIO</h1>
          </div>
        </FadeIn>

        <div className={"container py-3" + " " + hideEditButton}>
          <div className="row">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className={"container" + " " + hide}>
          <form
            onSubmit={event => {
              this.onSubmit(event);
              event.target.reset();
            }}
            className="my-4"
          >
            <div className="form-row">
              <div className="form-group col-sm-9">
                <label htmlFor="photo">Photo URL</label>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.photo}
                />
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.price}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="streetnumber">Street Number</label>
                <input
                  type="text"
                  name="streetnumber"
                  id="streetnumber"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.streetnumber}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.street}
                />
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="aptnumber">Apartment Number</label>
                <input
                  type="text"
                  name="aptnumber"
                  id="aptnumber"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.aptnumber}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-5">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.city}
                />
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value="MA"
                />
              </div>
              <div className="form-group col-sm-5">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.zip}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="status"
                  required
                  onChange={this.onChange}
                  value="Active"
                  checked={this.state.status === "Active"}
                />
                <label className="form-check-label" htmlFor="status">
                  Active
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="status"
                  required
                  onChange={this.onChange}
                  value="Sold"
                  checked={this.state.status === "Sold"}
                />
                <label className="form-check-label" htmlFor="status">
                  Sold
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="status"
                  required
                  onChange={this.onChange}
                  value="Rental"
                  checked={this.state.status === "Rental"}
                />
                <label className="form-check-label" htmlFor="status">
                  Rental
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <button type="submit" className="btn custom-button mt-3">
                  Add Property
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  className="btn btn-info mt-3"
                  onClick={this.onSubmitEdit}
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container py-5 text-center">
          <FadeInUp>
            <h2 style={{ fontWeight: "bold" }}>ACTIVE PROPERTIES</h2>
          </FadeInUp>
          <div className="row pt-3 pb-5">{displayActivePortfolio}</div>

          <FadeInUp>
            <h2 style={{ fontWeight: "bold" }}>SOLD PROPERTIES </h2>
          </FadeInUp>
          <div className="row pt-3 pb-5">{displaySoldPortfolio}</div>

          <FadeInUp>
            <h2 style={{ fontWeight: "bold" }}>RENTED PROPERTIES</h2>
          </FadeInUp>
          <div className="row pt-3 pb-5">{displayRentalPortfolio}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default PortfolioContainer;
