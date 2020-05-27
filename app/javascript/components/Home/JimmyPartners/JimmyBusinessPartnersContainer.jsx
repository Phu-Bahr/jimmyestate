import React, { Component } from "react";
import { ParallaxBanner, FormMaps } from "../../Constants/Constants";
import DraftJSContainer from "../../Constants/DraftJSComponent";

class JimmyBusinessPartners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "jimmy_partners",
      bannerImage: "",
      headerText1: "",
      headerText2: "",
      id: null,
      refreshKey: false
    };
  }

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;

    const body = {
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
          alert("Content has been updated");
          return response.json();
        }
        alert("Something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
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
          headerText1: body[body.length - 1].headerText1,
          headerText2: body[body.length - 1].headerText2,
          id: body[body.length - 1].id,
          bannerImage: body[body.length - 1].bannerImage
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

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
    let contentInfo = {
      bannerImage: "Banner Image"
    };

    let bannerForm = (
      <div className="container pt-5">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 pb-5">
            <form onSubmit={this.onSubmit}>
              <FormMaps
                onChange={this.onChange}
                value={this.state}
                formConst={contentInfo}
              />

              <button type="submit" className="btn custom-button">
                Submit Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <ParallaxBanner {...this.state} />
        {this.props.user.admin ? bannerForm : null}
        <div>
          <DraftJSContainer {...this.state} {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default JimmyBusinessPartners;
