import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import Recaptcha from "react-google-invisible-recaptcha";
import RelocationPhotoContainer from "./RelocationPhotoContainer";
import { FadeIn, FadeInLeft } from "../../Constants/Constants";

class RelocationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      time: "Anytime",
      destinationaddress: "",
      timeframe: "",
      assistsell: "Maybe",
      message: "",
      relocationEditData: [],
      paragraph1: "",
      paragraph2: "",
      bannerText1: "",
      bannerText2: "",
      refreshKey: false,
      hideDiv: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onResolved = this.onResolved.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  clickEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onResolved() {
    console.log("Captcha all set");
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.recaptcha.execute();

    const urls = "/api/v1/relocations";

    const {
      name,
      email,
      phone,
      time,
      destinationaddress,
      timeframe,
      assistsell,
      message
    } = this.state;

    const body = {
      name,
      email,
      phone,
      time,
      destinationaddress,
      timeframe,
      assistsell,
      message
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Your inquiry has been received!");
          return response.json();
        }
        alert(
          "There was a network issue, please try again or Email Jimmy directly."
        );
        throw new Error("Network response was not ok.");
      })
      .then(this.scrollToTop)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/relocation_edits")
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
        let newRelocationEditData = body;
        this.setState({
          relocationEditData: newRelocationEditData,
          id: newRelocationEditData[0].id,
          bannerText1: newRelocationEditData[0].bannerText1,
          bannerText2: newRelocationEditData[0].bannerText2,
          paragraph1: newRelocationEditData[0].paragraph1,
          paragraph2: newRelocationEditData[0].paragraph2
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/relocation_edits")
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
          let newRelocationEditData = body;
          this.setState({
            relocationEditData: newRelocationEditData
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  onSubmitEdit(event) {
    event.preventDefault();
    const urls = "/api/v1/relocation_edits/1";
    const { bannerText1, bannerText2, paragraph1, paragraph2 } = this.state;

    const body = {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2
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

  render() {
    console.log(this.state.bannerText1);

    let hideEditButton;
    if (this.props.user.admin) {
      hideEditButton = "";
    } else {
      // set below to blank string to default show edit buttons
      hideEditButton = "invisible";
    }

    let hide;
    if (this.state.hideDiv) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let locationContent = this.state.relocationEditData.map(element => {
      return (
        <div key={element.id}>
          <p className="pb-2">{element.paragraph1}</p>
          <p className="pb-2">{element.paragraph2}</p>
        </div>
      );
    });

    let bannerContent = this.state.relocationEditData.map(element => {
      return (
        <div key={element.id} className="container py-5">
          <h1>{element.bannerText1}</h1>
          <h4>{element.bannerText2}</h4>
        </div>
      );
    });

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxRelocationPage darken-pseudo darken-with-text">
            {bannerContent}
          </div>
        </FadeIn>
        <div className={"container py-3" + " " + hideEditButton}>
          <div className="row">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row">
            <div className="col-sm-6 pb-3">
              <FadeInLeft>
                {locationContent}
                <div className="container">
                  <form
                    onSubmit={event => {
                      this.onSubmitEdit(event);
                      event.target.reset();
                    }}
                    className={hide}
                  >
                    <div className="form-group">
                      <label htmlFor="bannerText1">Your bannerText1</label>
                      <input
                        type="text"
                        name="bannerText1"
                        id="bannerText1"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.bannerText1}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bannerText2">Your bannerText2</label>
                      <input
                        type="text"
                        name="bannerText2"
                        id="bannerText2"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.bannerText2}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="paragraph1">Your paragraph1</label>
                      <input
                        type="text"
                        name="paragraph1"
                        id="paragraph1"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.paragraph1}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="paragraph2">Your paragraph2</label>
                      <input
                        type="text"
                        name="paragraph2"
                        id="paragraph2"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.paragraph2}
                      />
                    </div>
                    <div className="pb-3">
                      <button type="submit" className="btn custom-button">
                        Update
                      </button>
                    </div>
                  </form>
                </div>

                <form
                  onSubmit={event => {
                    this.onSubmit(event);
                    event.target.reset();
                  }}
                >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="time">Best time to reach you?</label>
                      <select
                        type="text"
                        name="time"
                        id="time"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.time}
                      >
                        <option>Anytime</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="destinationaddress">
                      Your Destination Address
                    </label>
                    <input
                      type="text"
                      name="destinationaddress"
                      id="destinationaddress"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-7">
                      <label htmlFor="timeframe">Moving time frame?</label>
                      <input
                        type="text"
                        name="timeframe"
                        id="timeframe"
                        className="form-control"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="assistsell">
                        Need assistance selling?
                      </label>
                      <select
                        type="text"
                        name="assistsell"
                        id="assistsell"
                        className="form-control"
                        onChange={this.onChange}
                        required
                        value={this.state.propertytype}
                      >
                        <option>Maybe</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      rows="5"
                      type="text"
                      name="message"
                      id="message"
                      className="form-control"
                      onChange={this.onChange}
                      required
                      placeholder="Additional information you'd like to tell me."
                    />
                  </div>
                  <button type="submit" className="btn custom-button mt-3">
                    Send
                  </button>
                  <Recaptcha
                    ref={ref => (this.recaptcha = ref)}
                    sitekey="6LduIvAUAAAAANu_zPUXIWLmjk_L-ZWdJkAFJbx7"
                    onResolved={this.onResolved}
                  />
                </form>
              </FadeInLeft>
            </div>
            <RelocationPhotoContainer user={this.props.user} hide={hide} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RelocationContainer;
