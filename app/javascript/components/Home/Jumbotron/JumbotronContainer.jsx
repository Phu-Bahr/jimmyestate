import React, { Component } from "react";
import Particles from "react-particles-js";
import JumboTile from "./JumboTile";
import { FadeIn } from "../../Constants/Constants";

const particleOpt = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      stroke: {
        width: 0
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.4,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 70,
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
      straight: false,
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true
      },
      onclick: {
        enable: true
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 150,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  }
};

class JumbotronContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumboData: [],
      line1: "",
      line2: "",
      line3: "",
      refreshKey: false,
      hideDiv: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  clickEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/jumbotrons/1";
    const { line1, line2, line3 } = this.state;

    const body = {
      line1,
      line2,
      line3
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
    fetch("/api/v1/jumbotrons")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statuseText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        let newJumboData = body;
        this.setState({
          jumboData: newJumboData,
          line1: newJumboData[0].line1,
          line2: newJumboData[0].line2,
          line3: newJumboData[0].line3
        });
      })
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/jumbotrons")
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
          let newJumbo = body;
          this.setState({ jumboData: newJumbo });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    if (this.state.refreshKey === true) {
      this.setState({ refreshKey: false });
    }

    let hide;
    if (this.state.hideDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    const jumboData = this.state.jumboData;
    let jumboList = jumboData.map(element => {
      return (
        <JumboTile
          key={element.id}
          id={element.id}
          line1={element.line1}
          line2={element.line2}
          line3={element.line3}
        />
      );
    });

    return (
      <React.Fragment>
        <FadeIn>
          <div className="text-white text-center">
            <div className="card card-image py-5 jumboBackground">
              <div className="py-5">
                <div>
                  <Particles
                    className="particles overlayParticle"
                    params={particleOpt}
                  />
                </div>
                <div>{jumboList}</div>
                <div className={this.props.hideEditButton}>
                  <div className="col-sm-12 my-4">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={this.clickEdit}
                    >
                      Edit
                    </button>
                  </div>

                  <div className={"container" + " " + hide}>
                    <div className="row">
                      <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <p className="font-weight-normal mb-3">
                          Update your info here...
                        </p>

                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              name="line1"
                              id="line1"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.line1}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="line2"
                              id="line2"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.line2}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="textarea"
                              name="line3"
                              id="line3"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.line3}
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn custom-button mt-3"
                          >
                            Update title data
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default JumbotronContainer;
