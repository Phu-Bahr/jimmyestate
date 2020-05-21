import React, { Component } from "react";
import EventTile from "./EventTile";
import NewEvent from "./NewEvent";
import Map from "./MapEvent";
import { FadeIn } from "../../Constants/Constants";

class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideDiv: true,
      title: "",
      location: "",
      date: "",
      time: "",
      flier: "",
      lat: "",
      lng: "",
      selectedStepId: null,
      eventData: [],
      refreshKey: false
    };

    this.clickEventEdit = this.clickEventEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  setSelectedStep(stepId) {
    if (this.state.selectedStepId === stepId) {
      this.setState({ selectedStepId: null });
    } else {
      this.setState({ selectedStepId: stepId });
    }
  }

  editCurrentEventState(a, b, c, d, e, f, g, h) {
    if (this.state.selectedStepId === f) {
      this.setState({
        title: a,
        location: b,
        date: c,
        time: d,
        flier: e,
        lat: g,
        lng: h
      });
    } else {
      this.setState({
        title: a,
        location: b,
        date: c,
        time: d,
        flier: e,
        selectedStepId: f,
        lat: g,
        lng: h
      });
    }
  }

  clickEventEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  deleteEvent(id) {
    const urls = `/api/v1/events/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
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

  updateEvent(id) {
    event.preventDefault();
    const urls = `/api/v1/events/${id}`;
    const { title, location, date, time, flier, lat, lng } = this.state;

    const body = {
      title,
      location,
      date,
      time,
      flier,
      lat,
      lng
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
          alert("Event has been updated.");
          return response;
        } else {
          let errorMessage = `${resopnse.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.props.toggleRefreshKey)

      .then(
        this.setState({
          title: "",
          location: "",
          date: "",
          time: "",
          flier: "",
          lat: "",
          lng: ""
        })
      )
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/events")
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
        let newEventData = body;
        this.setState({
          eventData: newEventData,
          flier: newEventData[0].flier,
          lat: newEventData[0].lat,
          lng: newEventData[0].lng
        });
      })
      .catch(() => this.props.history.push("/"));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/events")
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
          let newEventData = body;
          this.setState({
            eventData: newEventData,
            flier: newEventData[0].flier,
            lat: newEventData[0].lat,
            lng: newEventData[0].lng
          });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(() => this.props.history.push("/"));
    }
  }

  onUpdateGeocode(event) {
    let location = `${this.state.location}`;

    fetch(`/api/v1/events/search?location=${location}`)
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
        console.log("geocode update body", body);
        this.setState({
          lat: body.data[0].lat,
          lng: body.data[1].lng
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    console.log("event container log", this.state);

    let hide;
    let editMode1;
    let editMode2;
    if (this.state.hideDiv === true) {
      hide = "invisible";
      editMode1 = "col-md-4 py-2";
      editMode2 = "col-md-8 pb-3";
    } else {
      hide = "";
      editMode1 = "col-md-5 pb-1";
      editMode2 = "col-md-7 pb-3";
    }

    let photo;
    // if (this.state.flier === "") {
    //   let photoDefault = [];

    //   photo = this.state.eventData.forEach(element => {
    //     photoDefault.push(element.flier);
    //     return this.setState({ flier: photoDefault[0] });
    //   });
    // } else {
    photo = (
      <React.Fragment key={this.state.selectedStepId}>
        <FadeIn>
          <div>
            <img className="img-fluid" src={this.state.flier} />
          </div>
        </FadeIn>
      </React.Fragment>
    );
    // }

    let events = this.state.eventData.map(element => {
      let hideUpdate;
      if (element.id === this.state.selectedStepId) {
        hideUpdate = "";
      } else {
        hideUpdate = "invisible";
      }

      let handleDelete = () => {
        let result = confirm("Are you sure?");
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      let submitUpdate = () => {
        this.updateEvent(element.id);
      };

      let onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      let clickHideUpdate = () => {
        this.setSelectedStep(element.id);
      };

      let handleUpdateGeocode = () => {
        this.onUpdateGeocode();
      };

      let getCurrentEventState = () => {
        this.editCurrentEventState(
          element.title,
          element.location,
          element.date,
          element.time,
          element.flier,
          element.id,
          element.lat,
          element.lng
        );
        this.setSelectedStep(element.id);
      };

      let titleState;
      let locationState;
      let dateState;
      let timeState;
      let flierState;
      let latState;
      let lngState;

      if (this.state.selectedStepId === element.id) {
        (titleState = this.state.title),
          (locationState = this.state.location),
          (dateState = this.state.date),
          (timeState = this.state.time),
          (flierState = this.state.flier);
        latState = this.state.lat;
        lngState = this.state.lng;
      } else {
        (titleState = ""),
          (locationState = ""),
          (dateState = ""),
          (timeState = ""),
          (flierState = "");
        latState = "";
        lngState = "";
      }

      return (
        <EventTile
          key={element.id}
          id={element.id}
          title={element.title}
          location={element.location}
          date={element.date}
          time={element.time}
          flier={element.flier}
          lat={element.lat}
          lng={element.lng}
          hide={hide}
          hideUpdate={hideUpdate}
          clickHideUpdate={clickHideUpdate}
          handleDelete={handleDelete}
          submitUpdate={submitUpdate}
          onChange={onChange}
          titleState={titleState}
          locationState={locationState}
          dateState={dateState}
          timeState={timeState}
          flierState={flierState}
          latState={latState}
          lngState={lngState}
          payload={getCurrentEventState}
          handleUpdateGeocode={handleUpdateGeocode}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="text-center">
          <h1>Events coming up</h1>

          <div className={this.props.hideEditButton}>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEventEdit}
              >
                Edit Events
              </button>
            </div>

            <div className={"pt-4" + " " + hide}>
              <NewEvent toggleRefreshKey={this.toggleRefreshKey} />
            </div>
          </div>
        </div>

        <div className="row p-4">
          <div id="event-box" className={editMode1}>
            {events}
          </div>
          <div className={editMode2}>
            <div className="row">
              <div className="col-sm-6 py-2">
                <div>{photo}</div>
              </div>
              <div className="col-sm-6 py-2">
                <Map
                  lat={parseFloat(this.state.lat)}
                  lng={parseFloat(this.state.lng)}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventContainer;
