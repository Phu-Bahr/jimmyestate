import React, { Component } from "react";
import PortfolioProperties from "./PortfolioProperties";
import {
  FadeIn,
  ParallaxBannerRoutes,
  FormMaps,
  ParallaxEditForm
} from "../../Constants/Constants";

class PortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "portfolio_edits",
      bannerImage: "",
      headerText1: "",
      headerText2: "",
      id: null,
      refreshKey: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

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
        this.setState({
          bannerImage: body[body.length - 1].bannerImage,
          headerText1: body[body.length - 1].headerText1,
          headerText2: body[body.length - 1].headerText2,
          id: body[body.length - 1].id
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { bannerImage, headerText1, headerText2 } = this.state;

    const body = {
      bannerImage,
      headerText1,
      headerText2
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
          alert("Content has been updated");
          return response.json();
        }
        alert("Something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
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
          this.setState({
            bannerImage: body[body.length - 1].bannerImage,
            headerText1: body[body.length - 1].headerText1,
            headerText2: body[body.length - 1].headerText2,
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
        <FadeIn>
          <ParallaxBannerRoutes {...this.state} />
          {this.props.user.admin ? (
            <ParallaxEditForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              value={this.state}
            />
          ) : null}
        </FadeIn>
        <PortfolioProperties {...this.props} />
      </React.Fragment>
    );
  }
}

export default PortfolioContainer;
