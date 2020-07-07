import React, { Component } from "react";
import {
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import { animateScroll as scroll } from "react-scroll";

class JimmyTipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "jimmy_tips",
      headerText1: "",
      headerText2: "",
      id: null,
      bannerImage: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onSubmit(event) {
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
  }

  componentDidMount() {
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
          id: body[body.length - 1].id,
          bannerImage: body[body.length - 1].bannerImage
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
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
            id: body[body.length - 1].id,
            bannerImage: body[body.length - 1].bannerImage
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
          {this.props.user.admin === true ? (
            <ParallaxEditForm
              value={this.state}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          ) : (
            ""
          )}

          <div>
            <DraftJSContainer {...this.state} {...this.props} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JimmyTipContainer;
