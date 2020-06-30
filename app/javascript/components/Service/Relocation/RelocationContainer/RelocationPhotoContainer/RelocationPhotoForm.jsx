import React from "react";
import { AddButton } from "../../../../Constants/Buttons";

const RelocationPhotoForm = ({ onSubmit, onChange }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default RelocationPhotoForm;
