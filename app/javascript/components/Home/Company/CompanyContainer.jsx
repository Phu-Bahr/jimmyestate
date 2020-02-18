import React, { Component } from "react";

class CompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      description: "",
      refreshKey: false,
      hidDiv: true
    };

    this.clickEdit = this.clickEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  clickEdit(event) {
    if (this.state.hidDiv === false) {
      this.setState({ hidDiv: true });
    } else {
      this.setState({ hidDiv: false });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/companies/1";
    const { description } = this.state;

    const body = {
      description
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
    fetch("/api/v1/companies")
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
        let newCompanyData = body;
        this.setState({ companyData: newCompanyData });
      })
      .then(this.setState({ refreshKey: false }))
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/companies")
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
          let newCompanyData = body;
          this.setState({ companyData: newCompanyData });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    let hide;
    if (this.state.hidDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let companyData = this.state.companyData;
    let companyDescription = companyData.map(element => {
      return element.description;
    });

    return (
      <div id="companyTag">
        <div className="parallaxCompany">
          <div className="center">
            <h1 className="companyfont">Company</h1>
          </div>
        </div>
        <div>
          <section className="container-fluid companycontent py-5">
            <div className="container">
              <p> {companyDescription} </p>
            </div>
            <div className={this.props.hideEditButton}>
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>

              <div className={"col-xs-12 col-sm-12 col-md-12" + " " + hide}>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group pt-3">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="form-control"
                      onChange={this.onChange}
                      placeholder="Update Description Here..."
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="btn custom-button">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default CompanyContainer;
