import React, { Component } from "react";
import { FadeIn, FadeInUp } from "../../Constants/Constants";
import { Link } from "react-router-dom";
import DraftJSContainer from "../../Constants/DraftJSComponent";

class AboutCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText1: "",
      headerText2: "",
      image: "",
      id: null,
      urlGET: "about_companies"
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, image } = this.state;

    const body = {
      headerText1,
      headerText2,
      image
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
          alert("Content has been saved");
          return response.json();
        }
        alert("Error, not updated.");
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch(`/api/v1/${this.state.urlGET}`)
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
        if (body) {
          this.setState({
            headerText1: body[body.length - 1].headerText1,
            headerText2: body[body.length - 1].headerText2,
            image: body[body.length - 1].image,
            id: body[body.length - 1].id
          });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch(`api/v1/${this.state.urlGET}`)
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
            headerText1: body[body.length - 1].headerText1,
            headerText2: body[body.length - 1].headerText2,
            image: body[body.length - 1].image,
            id: body[body.length - 1].id
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    console.log("STATE", this.state);

    let editMenu = (
      <React.Fragment>
        <div className="container pb-5">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="headerText1">Header Text 1</label>
                <input
                  type="text"
                  name="headerText1"
                  id="headerText1"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.headerText1}
                />
              </div>

              <div className="form-group">
                <label htmlFor="headerText2">Header Text 2</label>
                <input
                  type="text"
                  name="headerText2"
                  id="headerText2"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.headerText2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.image}
                />
              </div>

              <button
                type="submit"
                className="btn custom-button mt-6"
                onClick={this.scrollToTop}
              >
                Submit changes
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxAboutCompanyPage">
            <div className="container py-5">
              <h1>{this.state.headerText1}</h1>
              <h4>{this.state.headerText2}</h4>
            </div>
          </div>
        </FadeIn>
        <FadeInUp>
          <div className="pt-4 pb-3 text-center">
            <img className="img-fluid rounded" src={this.state.image}></img>
          </div>
        </FadeInUp>
        {this.props.user.admin === true ? editMenu : ""}
        <FadeIn>
          <DraftJSContainer {...this.state} {...this.props} />
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default AboutCompanyContainer;
