import React, { Component } from "react";
import {
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";
import Testimonials from "./Testimonials";

class TestimonialsContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      url: "testimonial_edits",
      headerText1: "",
      headerText2: "",
      bannerImage: "",
      id: null,
      visibility: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  editBanner = () => {
    this.state.visibility
      ? this.setState({ visibility: false })
      : this.setState({ visibility: true });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.state.url}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;

    const body = {
      headerText1,
      headerText2,
      bannerImage
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
          alert("Content has been updated");
          return response.json();
        }
        alert("something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    this.mountTestTemplate();
  }

  componentDidUpdate() {
    this.updateTestTemplate();
  }

  mountTestTemplate() {
    fetch(`/api/v1/${this.state.url}`)
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
          bannerImage: body[body.length - 1].bannerImage,
          id: body[body.length - 1].id
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  updateTestTemplate() {
    if (this.state.refreshKey) {
      fetch(`/api/v1/${this.state.url}`)
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
            bannerImage: body[body.length - 1].bannerImage,
            id: body[body.length - 1].id
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state} />
          {this.props.user.admin ? (
            <div className="container text-center pt-4">
              <button className="btn custom-button" onClick={this.editBanner}>
                Edit Banner
              </button>
            </div>
          ) : null}
          {this.state.visibility === true ? (
            <ParallaxEditForm
              value={this.state}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          ) : (
            ""
          )}

          <Testimonials user={this.props.user} />
        </div>
      </React.Fragment>
    );
  }
}

export default TestimonialsContainer;
