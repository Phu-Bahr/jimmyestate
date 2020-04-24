import React, { Component } from "react";

class PortfolioContainer extends Component {
  constructor() {
    super();
    this.state = {
      portfolioData: [],
      refreshKey: false,
      bannerText: "",
      photo: "",
      price: "",
      streetnumber: "",
      street: "",
      aptnumber: "",
      city: "",
      state: "",
      zip: "",
      status: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.toggleRefreshKeyFalse = this.toggleRefreshKeyFalse.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

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
      bannerText,
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
      bannerText,
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
      .then(this.toggleRefreshKey)
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
    console.log("Portfolio state ==> ", this.state.portfolioData);
    console.log("refresh key", this.state.refreshKey);

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

      if (element.status === "Active") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Delete Venue
            </button>
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

      if (element.status === "Sold") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Delete Venue
            </button>
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
      if (element.status === "Rental") {
        return (
          <div key={element.id} className="col-md-4 col-middle px-3 py-2">
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Delete Venue
            </button>
          </div>
        );
      }
    });

    return (
      <div>
        <div className="parallaxAboutPortfolioPage darken-pseudo darken-with-text">
          <h1 className="text-center caption">PORTFOLIO</h1>
        </div>

        <div className="container">
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
                />
                <label className="form-check-label" htmlFor="status">
                  Rental
                </label>
              </div>
            </div>

            <button type="submit" className="btn custom-button mt-3">
              Add Portfolio Piece
            </button>
          </form>
        </div>

        <div className="container py-5 text-center">
          <h4>ACTIVE PROPERTIES</h4>
          <div className="row">{displayActivePortfolio}</div>
          <h4>SOLD PROPERTIES </h4>
          <div className="row">{displaySoldPortfolio}</div>
          <h4>RENTED PROPERTIES</h4>
          <div className="row">{displayRentalPortfolio}</div>
        </div>
      </div>
    );
  }
}
export default PortfolioContainer;
