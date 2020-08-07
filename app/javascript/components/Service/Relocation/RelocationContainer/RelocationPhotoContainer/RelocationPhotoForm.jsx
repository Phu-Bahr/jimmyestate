import React, { Fragment } from "react";
import { AddButton } from "../../../../Constants/Buttons";

const RelocationPhotoForm = ({ onSubmit, onChange }) => {
  return (
    <Fragment>
      <div className="pb-3">
        <form onSubmit={onSubmit}>
          <label htmlFor="photo">Photo URL</label>
          <input
            type="url"
            name="photo"
            id="photo"
            className="form-control"
            required
            onChange={onChange}
          />
          <AddButton className="mt-3" value="Add Photo" />
        </form>
      </div>
    </Fragment>
  );
};

export default RelocationPhotoForm;
