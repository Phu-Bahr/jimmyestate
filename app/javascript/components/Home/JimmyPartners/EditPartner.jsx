import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

class EditPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getURL: "partner_categories",
      partnerData: {},
      id: "",
      name: "",
      headerText1: "",
      headerText2: "",
      bannerImage: ""
    };
    this.fetchPartnerData = this.fetchPartnerData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refreshTownList = this.refreshTownList.bind(this);
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  refreshTownList() {
    this.props.refreshTownList();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/${this.state.getURL}/${this.state.id}`;
    const { name, headerText1, headerText2, bannerImage } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      bannerImage
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
          alert("Content has been updated.");
          return response;
        } else {
          alert("Something went wrong");
          let errorMessage = `${resopnse.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(body => {
        this.props.history.push(`/partner/${this.state.id}`);
        // window.location.reload(false);
      })
      .then(this.refreshTownList())
      .then(window.scrollTo(0, 0))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchPartnerData(id);
  }

  componentDidUpdate() {
    let id = this.props.match.params.id;
    if (this.state.id != id) {
      this.fetchPartnerData(id);
    }
  }

  fetchPartnerData(id) {
    fetch(`/api/v1/${this.state.getURL}/${id}`)
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
          partnerData: body,
          id: body.id,
          name: body.name,
          headerText1: body.headerText1,
          headerText2: body.headerText2,
          bannerImage: body.bannerImage
        });
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row pb-5">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Edit Partner here.</h1>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Partner Category Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>

              <label htmlFor="bannerImage">Banner Image</label>
              <input
                type="text"
                name="bannerImage"
                id="bannerImage"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.bannerImage}
              />

              <label htmlFor="headerText1">headerText1</label>
              <input
                type="text"
                name="headerText1"
                id="headerText1"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.headerText1}
              />

              <label htmlFor="headerText2">headerText2</label>
              <input
                type="text"
                name="headerText2"
                id="headerText2"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.headerText2}
              />

              <button type="submit" className="btn custom-button mt-3">
                Submit Partner changes
              </button>

              <Link
                to={`/partner/${this.state.id}`}
                className="btn btn-link mt-3"
                onClick={this.scrollToTop}
              >
                Back to Partner
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPartner;
