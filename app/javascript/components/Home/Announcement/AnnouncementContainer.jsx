import React, { Component } from "react";
import EventContainer from "./EventContainer";

class AnnouncementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementData: [],
      hideEditAnnounce: true,
      description: "",
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
    const { description, title } = this.state;

    const body = {
      description,
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
    Promise.all([fetch("/api/v1/announcements")])
      .then(([response1]) => {
        return Promise.all([response1.json()]);
      })
      .then(([response1]) => {
        this.setState({
          announcementData: response1,
          description: response1[0].description,
          title: response1[0].title
        });
      })
      // need to add error messages
      .catch(error => console.log(error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      Promise.all([fetch("/api/v1/announcements")])
        .then(([response1]) => {
          return Promise.all([response1.json()]);
        })
        .then(([response1]) => {
          this.setState({
            announcementData: response1,
            description: response1[0].description,
            title: response1[0].title
          });
        })
        // need to add error messages
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  render() {
    console.log("announcement container log", this.state);

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

    let announcementTitle = announcementData.map(element => {
      return element.title;
    });

    return (
      <div>
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
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-lg-1">
                  <p>{announcementDescription}</p>
                </div>
              </div>
            </div>
            <div className={this.props.hideEditButton}>
              <div className="pb-5">
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

                      <button type="submit" className="btn custom-button">
                        Submit Change
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <EventContainer hideEditButton={this.props.hideEditButton} />
          </div>
        </div>
      </div>
    );
  }
}

export default AnnouncementContainer;
