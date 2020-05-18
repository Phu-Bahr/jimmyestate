import React, { Component } from "react";
import { FadeIn } from "../../Constants/Constants";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import { animateScroll as scroll } from "react-scroll";

class JimmyTipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "jimmy_tips",
      headerText1: "",
      headerText2: "",
      id: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2 } = this.state;

    const body = {
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
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
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
        this.setState({
          headerText1: body[body.length - 1].headerText1,
          headerText2: body[body.length - 1].headerText2,
          id: body[body.length - 1].id
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
            id: body[body.length - 1].id
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  render() {
    let parallaxEditForm = (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <form onSubmit={this.onSubmit}>
              <h5 className="text-center pb-3">
                Update will work after Draft Content has been created
              </h5>
              <label htmlFor="headerText1">Header Text 1</label>
              <input
                type="text"
                name="headerText1"
                id="headerText1"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.headerText1}
              />

              <label htmlFor="headerText2">Header Text 2</label>
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
                Submit Header changes
              </button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxJimmyTipPage">
            <div className="container py-5">
              <h1>{this.state.headerText1}</h1>
              <h4>{this.state.headerText2}</h4>
            </div>
          </div>
          {this.props.user.admin === true ? parallaxEditForm : ""}
        </FadeIn>

        <div>
          <DraftJSContainer {...this.state} {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default JimmyTipContainer;
