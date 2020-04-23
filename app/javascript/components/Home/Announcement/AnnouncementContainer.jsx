import React, { Component } from "react";
import EventContainer from "./EventContainer";
import NewEvent from "./NewEvent";

class AnnouncementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementData: [],
      eventData: [],
      hideEditAnnounce: true,
      description: "",
      flier: "",
      title: "",
      refreshKey: false
    };

    this.clickEdit = this.clickEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  clickEdit(event) {
    if (this.state.hideEditAnnounce === false) {
      this.setState({ hideEditAnnounce: true });
    } else {
      this.setState({ hideEditAnnounce: false });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    // need to make url more dynamic than hard code 1
    const urls = "/api/v1/announcements/1";
    const { description, flier, title } = this.state;

    const body = {
      description,
      flier,
      title
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
    Promise.all([fetch("/api/v1/announcements"), fetch("/api/v1/events")])
      .then(([response1, response2]) => {
        return Promise.all([response1.json(), response2.json()]);
      })
      .then(([response1, response2]) => {
        this.setState({
          announcementData: response1,
          description: response1[0].description,
          flier: response1[0].flier,
          title: response1[0].title
        });
        this.setState({ eventData: response2 });
      })
      // need to add error messages
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      Promise.all([fetch("/api/v1/announcements"), fetch("/api/v1/events")])
        .then(([response1, response2]) => {
          return Promise.all([response1.json(), response2.json()]);
        })
        .then(([response1, response2]) => {
          this.setState({
            announcementData: response1,
            description: response1[0].description,
            flier: response1[0].flier,
            title: response1[0].title
          });
          this.setState({ eventData: response2 });
        })
        // need to add error messages
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    let hide;
    if (this.state.hideEditAnnounce === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let announcementData = this.state.announcementData;

    let announcementDescription = announcementData.map(element => {
      return element.description;
    });

    let announcementFlier = announcementData.map(element => {
      return element.flier;
    });

    let announcementTitle = announcementData.map(element => {
      return element.title;
    });

    return (
      <div id="announcementTag">
        <div className="parallaxEvents">
          <div className="center">
            <h1 className="companyfont">Events</h1>
          </div>
        </div>
        <div className="container-fluid companycontent pt-5">
          <div className="text-center">
            <div>
              <h1>{announcementTitle}</h1>
            </div>
            <div>
              <h3>Your Real Estate Concierge</h3>
            </div>
            <div className="container pt-4 pb-4">
              <div className="row">
                <div className="col-md-10 offset-lg-1">
                  <p>{announcementDescription}</p>
                </div>
              </div>
            </div>
            <div className={this.props.hideEditButton}>
              <div className="pb-4">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.clickEdit}
                >
                  Edit Announcement/Image
                </button>
              </div>
              <div className={"container" + " " + hide}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 pb-5">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="form-control"
                          onChange={this.onChange}
                          value={this.state.title}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="description"
                          id="description"
                          className="form-control"
                          onChange={this.onChange}
                          value={this.state.description}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="flier"
                          id="flier"
                          className="form-control"
                          onChange={this.onChange}
                          value={this.state.flier}
                        />
                      </div>
                      <button type="submit" className="btn custom-button">
                        Submit Change
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 pb-5">
              <div className="text-center">
                <img className="glow-border" src={announcementFlier}></img>
              </div>
            </div>

            <div className="col-sm-6">
              <EventContainer
                eventData={this.state.eventData}
                refreshKey={this.state.refreshKey}
                hideEditButton={this.props.hideEditButton}
                toggleRefreshKey={this.toggleRefreshKey}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnnouncementContainer;
