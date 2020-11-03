import React, { Fragment } from "react";
import moment from "moment";
import {
  EditButton,
  DeleteButton,
  UpdateButton
} from "../../Constants/Buttons";

const EventTile = props => {
  let convert = input => {
    return moment(input, "HH:mm:00").format("h:mm a");
  };

  return (
    <Fragment>
      <div className="mobile-view companycontent">
        <div className="hvr-bounce-to-right p-3 mb-3" onClick={props.payload}>
          <div>{props.title}</div>
          <div>{props.location}</div>
          <div>
            <span style={{ display: "block" }}>
              {moment(props.date).format("MMMM Do, YYYY")}
            </span>
            <span style={{ display: "block" }}>
              {convert(props.time)} - {convert(props.timeEnd)}
            </span>
          </div>
        </div>
        {props.user.admin && (
          <div className="pb-3">
            <EditButton onClick={props.payload} />
            <DeleteButton onClick={props.handleDelete} className="ml-2" />

            <div className={"p-4" + " " + props.hideUpdate}>
              <form onSubmit={props.submitUpdate}>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="title">Name of Event</label>
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
                    <label htmlFor="location">Address</label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="form-control"
                      onChange={props.onChange}
                      value={props.locationState}
                    />
                    <div>
                      <UpdateButton
                        type="button"
                        onClick={props.handleUpdateGeocode}
                        value="Update Geocode"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label htmlFor="date">Date of Event</label>
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
                    <label htmlFor="time">Time of Event</label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      className="form-control"
                      onChange={props.onChange}
                      value={props.timeState}
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label htmlFor="timeEnd">Ending Time</label>
                    <input
                      type="time"
                      name="timeEnd"
                      id="timeEnd"
                      className="form-control"
                      onChange={props.onChange}
                      value={props.timeEndState}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="flier">Image URL</label>
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
                    <label htmlFor="lat">Latitude</label>
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
                    <label htmlFor="lng">Longitude</label>
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
                <UpdateButton />
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EventTile;
