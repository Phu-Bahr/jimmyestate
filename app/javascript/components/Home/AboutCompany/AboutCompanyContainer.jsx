import React, { Component } from "react";
import {
  FadeIn,
  FadeInUp,
  ParallaxBannerRoutes,
  FormMaps
} from "../../Constants/Constants";

import DraftJSContainer from "../../Constants/DraftJSComponent";

class AboutCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText1: "",
      headerText2: "",
      image: "",
      id: null,
      urlGET: "about_companies",
      bannerImage: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, image, bannerImage } = this.state;

    const body = {
      headerText1,
      headerText2,
      image,
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
            id: body[body.length - 1].id,
            bannerImage: body[body.length - 1].bannerImage
          });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey) {
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
            id: body[body.length - 1].id,
            bannerImage: body[body.length - 1].bannerImage
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    const parallaxFormContent = {
      bannerImage: "Banner Image",
      headerText1: "Header text 1",
      headerText2: "Header text 2",
      image: "Logo URL"
    };

    let editMenu = (
      <React.Fragment>
        <div className="container pb-5">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <form onSubmit={this.onSubmit}>
              <FormMaps
                formConst={parallaxFormContent}
                onChange={this.onChange}
                value={this.state}
              />

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
        <div className="flex-container">
          <FadeIn>
            <ParallaxBannerRoutes {...this.state} {...this.props} />
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
        </div>
      </React.Fragment>
    );
  }
}

export default AboutCompanyContainer;
