import React from "react";
import moment from "moment";

const EventTile = props => {
  let convert = input => {
    return moment(input, "HH:mm:00").format("h:mm a");
  };

  return (
    <div>
      <div className="event-border p-3">
        <div>{props.title}</div>
        <div>{props.location}</div>
        <div>
          {moment(props.date).format("MMMM Do YYYY")}, {convert(props.time)}
        </div>

        <br />
        <div className={"px-3" + " " + props.hide}>
          <button
            type="button"
            className="btn btn-info"
            onClick={props.clickHideUpdate}
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
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    onChange={props.onChange}
                    placeholder={props.title}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="form-control"
                    onChange={props.onChange}
                    placeholder={props.location}
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
                    placeholder={props.date}
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
                    placeholder={props.time}
                  />
                </div>
              </div>
              <button type="submit" className="btn custom-button">
                Submit Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
