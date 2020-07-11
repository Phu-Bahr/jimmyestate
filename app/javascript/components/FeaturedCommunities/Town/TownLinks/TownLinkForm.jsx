import React, { Fragment } from "react";
import { AddButton, UpdateButton } from "../../../Constants/Buttons";

const TownLinkForm = props => {
  return (
    <Fragment>
      <form onSubmit={props.onSubmit} className="my-4">
        <div className="form-group">
          <label htmlFor="townlink">Town Link</label>
          <input
            type="text"
            name="townlink"
            id="townlink"
            className="form-control"
            required
            onChange={props.onChange}
            placeholder="ex: www.wikipedia.com, **only use www or http(s) in front of it."
            value={props.townlink}
          />
        </div>
        <div className="form-group">
          <label htmlFor="townlinkdescription">Town Link Description</label>
          <input
            type="text"
            name="townlinkdescription"
            id="townlinkdescription"
            className="form-control"
            required
            onChange={props.onChange}
            placeholder="ex: Town Wikipedia"
            value={props.townlinkdescription}
          />
        </div>
        <AddButton type="submit" value="Create Town Link" />
      </form>
      {props.townlinkdescription != "" &&
        props.townlink != "" &&
        props.townlinkID != "" && (
          <UpdateButton
            type="submit"
            onClick={props.onSubmitEdit}
            value="Submit Town Link Changes"
          />
        )}
    </Fragment>
  );
};

export default TownLinkForm;
