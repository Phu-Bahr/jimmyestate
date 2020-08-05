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
        <div className="hvr-bounce-to-right p-3" onClick={props.payload}>
          <div>{props.title}</div>
          <div>{props.location}</div>
          <div>
            {moment(props.date).format("MMMM Do YYYY")}, {convert(props.time)}
          </div>
        </div>
        {props.user.admin && (
          <div className="pb-3">
            {props.hide ? null : (
              <Fragment>
                <EditButton onClick={props.payload} />
                <DeleteButton onClick={props.handleDelete} />
              </Fragment>
            )}
            <div className={"py-4" + " " + props.hideUpdate}>
              <form onSubmit={props.submitUpdate}>
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
                    <div>
                      <UpdateButton
                        type="button"
                        onClick={props.handleUpdateGeocode}
                        value="Update Geocode"
                      />
                    </div>
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
                <UpdateButton type="submit" />
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EventTile;
