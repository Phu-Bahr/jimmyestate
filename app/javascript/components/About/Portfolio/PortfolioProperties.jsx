import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import { FadeInUp } from "../../Constants/Constants";
import ScrollAnimation from "react-animate-on-scroll";
import { PortfolioPropertyForm } from "./PortfolioPropertyForm";

class PortfolioProperties extends Component {
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

  clickEdit() {
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
    const url = "/api/v1/portfolios";
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

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Property has been added.");
          return response.json();
        }
        alert("something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .then(this.clearState)
      .catch(error => console.log(error.message));
  }

  deleteEvent(id) {
    const url = `/api/v1/portfolios/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          alert("delete successful");
          return response;
        } else {
          alert("something went wrong");
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
      const url = `/api/v1/portfolios/${this.state.propertyID}`;
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
            alert("Property has been updated.");
            return response;
          } else {
            let errorMessage = `${resopnse.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
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
        this.setState({
          portfolioData: body
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
          this.setState({
            portfolioData: body
          });
        })
        .then(this.toggleRefreshKeyFalse)
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
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
        {this.props.user.admin ? (
          <div className="container py-3">
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
        ) : null}

        <div className={"container" + " " + hide}>
          <PortfolioPropertyForm
            onChange={this.onChange}
            value={this.state}
            onSubmitEdit={this.onSubmitEdit}
            onSubmit={this.onSubmit}
          />
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
export default PortfolioProperties;
