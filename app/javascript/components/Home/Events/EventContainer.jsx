import React, { Component, Fragment, createRef } from "react";
import Map from "../../Constants/MapEvent";
import EventTile from "./EventTile";
import NewEvent from "./NewEvent";
import {
  getGeocodeEventUpdate,
  deleteNoScrollFetch,
  putNoScrollFetch,
  getNoScrollFetch
} from "../../Constants/FetchComponent";
import AlertBox from "../../Constants/AlertComponent";
import { EditButton } from "../../Constants/Buttons";
import { Link } from "react-scroll";
import { gaLinks, gaEvents } from "../../Constants/GoogleAnalyticEvents";
const urlPath = "events";

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
      refreshKey: false,
      typeOfAlert: null,
      idForAlert: null,
      id: null
    };
    this.submitNewEvent = createRef();
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  clickEventEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  submitEvent = () => this.submitNewEvent.current.submit();

  setSelectedStep = stepId => {
    this.state.selectedStepId === stepId
      ? this.setState({ selectedStepId: null })
      : this.setState({ selectedStepId: stepId });
  };

  editCurrentEventState = (a, b, c, d, e, f, g, h) => {
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
  };

  deleteEvent = id => {
    const url = `/api/v1/${urlPath}/${id}`;
    deleteNoScrollFetch(url, this.props.alertType).then(this.toggleRefreshKey);
  };

  updateEvent = id => {
    event.preventDefault();
    const url = `/api/v1/events/${id}`;
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

    putNoScrollFetch(url, body, this.props.alertType)
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
      .then(this.toggleRefreshKey);
  };

  mountState = body => {
    body.length == 0
      ? this.setState({
          eventData: body,
          flier: "",
          lat: "",
          lng: "",
          id: "",
          location: ""
        })
      : this.setState({
          eventData: body,
          flier: body[body.length - 1].flier,
          lat: body[body.length - 1].lat,
          lng: body[body.length - 1].lng,
          id: body[body.length - 1].id
        });
  };

  componentDidMount = () => getNoScrollFetch(urlPath, this.mountState);

  componentDidUpdate = () => {
    this.state.refreshKey === true &&
      getNoScrollFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  };

  mountLatLng = body =>
    this.setState({ lat: body.data[0].lat, lng: body.data[0].lng });

  onUpdateGeocode = () => {
    let location = `${this.state.location}`;
    getGeocodeEventUpdate(location, this.mountLatLng, this.alertType);
  };

  render() {
    console.log(this.state.id);

    let events = this.state.eventData.map(element => {
      let hideUpdate;
      element.id === this.state.selectedStepId
        ? (hideUpdate = "")
        : (hideUpdate = "invisible");

      let handleDelete = () => {
        this.setState({ idForAlert: element.id });
        this.deleteEvent(element.id);
      };

      let submitUpdate = () => this.updateEvent(element.id);
      let onChange = e => this.setState({ [e.target.name]: e.target.value });
      let handleUpdateGeocode = () => this.onUpdateGeocode();
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
        gaEvents(`${element.title} event`);
      };

      let titleState;
      let locationState;
      let dateState;
      let timeState;
      let flierState;
      let latState;
      let lngState;

      this.state.selectedStepId === element.id
        ? ((titleState = this.state.title),
          (locationState = this.state.location),
          (dateState = this.state.date),
          (timeState = this.state.time),
          (flierState = this.state.flier),
          (latState = this.state.lat),
          (lngState = this.state.lng))
        : ((titleState = ""),
          (locationState = ""),
          (dateState = ""),
          (timeState = ""),
          (flierState = ""),
          (latState = ""),
          (lngState = ""));

      return (
        <EventTile
          key={element.id}
          title={element.title}
          location={element.location}
          date={element.date}
          time={element.time}
          hideUpdate={hideUpdate}
          hide={this.state.hideDiv}
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
          user={this.props.user}
        />
      );
    });

    return (
      <section>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteEvent}
          submitEvent={this.submitEvent}
          updateEvent={this.updateEvent}
        />

        <div className="text-center">
          <header>
            <h1>EVENTS</h1>
          </header>
          <div className="event-line-break mt-3"></div>

          {this.props.user.admin && (
            <Fragment>
              <div className="text-center">
                <EditButton onClick={this.clickEventEdit} value="Add Event" />
              </div>

              {!this.state.hideDiv && (
                <div className="pt-4">
                  <NewEvent
                    toggleRefreshKey={this.toggleRefreshKey}
                    alertType={this.alertType}
                    urlPath={urlPath}
                    ref={this.submitNewEvent}
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>

        <div className="p-5">
          {this.state.eventData.length == 0 ? (
            <Link
              to="social"
              smooth={true}
              offset={-90}
              duration={1000}
              onClick={() => gaLinks("No Events Banner")}
            >
              <div className="empty-event">
                NO EVENTS LINED UP, FOLLOW ME ON SOCIAL!
              </div>
            </Link>
          ) : (
            <div className="row">
              <section className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
                {events}
              </section>
              <section className="col-sm-12 col-md-12 col-lg-12 col-xl-8">
                <div className="row">
                  <figure className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-2">
                    <img
                      className="img_wrapper"
                      src={this.state.flier}
                      alt={`Event image ` + this.state.id}
                      style={{ boxShadow: "0px 10px 13px -7px #000000" }}
                    />
                    {/* <Testimonials user={this.props.user}/> */}
                  </figure>

                  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 py-2">
                    <Map {...this.state} />
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default EventContainer;
