import React from "react";
import moment from "moment";

const EventTile = props => {
  let convert = input => {
    return moment(input, "HH:mm:00").format("h:mm a");
  };

  return (
    <React.Fragment>
      <div className="event-border p-3">
        <div onClick={props.payload}>
          <div>{props.title}</div>
          <div>{props.location}</div>
          <div>
            {moment(props.date).format("MMMM Do YYYY")}, {convert(props.time)}
          </div>
        </div>

        <br />
        <div className={"px-3" + " " + props.hide}>
          <button
            type="button"
            className="btn btn-info"
            onClick={props.payload}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.handleDelete}
          >
            Delete
          </button>
          <div className={"py-4" + " " + props.hideUpdate}>
            <form
              onSubmit={event => {
                props.submitUpdate(event);
                event.target.reset();
              }}
            >
              <div className="row">
                <div className="col-sm-6">
                  <label>Name of Event</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.titleState}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Address</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.locationState}
                  />
                </div>
                <div className="col-sm-12 col-lg-6">
                  <label>Date of Event</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.dateState}
                  />
                </div>
                <div className="col-sm-12 col-lg-6">
                  <label>Time of Event</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.timeState}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="flier"
                    id="flier"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.flierState}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Latitude</label>
                  <input
                    type="text"
                    name="lat"
                    id="lat"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.latState}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Longitude</label>
                  <input
                    type="text"
                    name="lng"
                    id="lng"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.lngState}
                  />
                </div>
              </div>
              <button type="submit" className="btn custom-button">
                Submit Update
              </button>
            </form>
            <div>
              <button
                type="button"
                className="btn btn-info"
                onClick={props.handleUpdateGeocode}
              >
                Update Geocode
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventTile;
