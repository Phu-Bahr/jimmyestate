import React, { Component } from "react";

class CompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      description: "",
      title: "",
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
    const { description, title } = this.state;

    const body = {
      description,
      title
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
        this.setState({
          companyData: newCompanyData,
          description: newCompanyData[0].description,
          title: newCompanyData[0].title
        });
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
          this.setState({
            companyData: newCompanyData
          });
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

    let companyTitle = companyData.map(element => {
      return element.title;
    });

    return (
      <div id="companyTag">
        <div className="parallaxCompany">
          <div className="center">
            <h1 className="companyfont">Company</h1>
          </div>
        </div>
        <div>
          <section
            className="container-fluid companycontent py-5"
            id="companyfont"
          >
            <div className="container">
              <h2 className="text-center py-5">{companyTitle}</h2>
              <p>Who We Are & What Makes Us Different</p>
              <p>
                RTN Realty Advisors LLC provides residential and commercial
                sales, leasing and property management services. Our agents are
                committed to giving clients the best possible experience with a
                multi-tiered approach to marketing and agent support. No matter
                how large or small a transaction is, our clients receive the
                highest-level of service to generate the best possible results.{" "}
              </p>
              <p>
                RTN Realty Advisors LLC is owned by RTN Federal Credit Union, a
                non-profit organization with 50k+ members and almost $1B in
                assets. The credit union owning our organization allows us
                access to a network of people across Massachusetts as well as a
                connection to all the services the credit union provides. While
                our services don’t have to be used together, there is value in
                having us all under one roof, which can save you time and money.
              </p>
              <p>
                Not a credit union member? That’s just fine, you aren’t required
                to have ties at all. You will still receive the value that we
                are able to offer when such a large financial institution backs
                our success. The bottom line is that our setup as a brokerage
                owned by a non-profit allows for us to focus on the education
                and service side of the transaction. We are able to focus solely
                on doing a good job while providing our clients all the value of
                a full-service brokerage.
              </p>
              <p>
                For those seeking to purchase a home, our synergistic
                relationship allows for a more seamless buying process. RTN
                Realty Advisors believes in service and education first, so our
                buyer clients don’t need to feel pressured to buy a home. With
                access to free educational seminars and information about the
                buying process, our agents make sure buyer’s feel prepare to
                make such a large financial decision. Choosing the right loan
                product for buyers is a big decision, and our agents have
                trusted contacts to help buyers find the right fit. If you do
                choose to go with an RTN FCU product, we do work in the same
                buildings with each other. That means more person to person
                interactions when things need to be completed and overall better
                communication during your transaction.
              </p>

              <p>
                For prospective home sellers, our value is unprecedented. Most
                agents are on their own when listing a home. They take on all
                the costs of listing including marketing, advertising,
                prospecting for buyers, and other business expenses. RTN Realty
                Advisors is different. The marketing of your home is completed
                by a dedicated team whose sole role is to market homes. We’re
                owned by a non-profit and our commissions aren’t driven from
                some broker’s profit model. In the end, we get to spend more
                time selling your property. We are not burdened financially by
                marketing and other business expenses, and you receive the
                high-end service you expect for your commission.
              </p>
              <p>{companyDescription}</p>
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
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.title}
                    />
                  </div>
                  <div className="form-group pt-3">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.description}
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
