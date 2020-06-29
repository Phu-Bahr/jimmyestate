import React from "react";
import { AddButton } from "../../../../Constants/Buttons";

const WorthPhotoForm = ({ onSubmit, onChange }) => {
  return (
    <div className="pb-3">
      <form onSubmit={onSubmit}>
        <label htmlFor="photo">Photo URL</label>
        <input
          type="url"
          name="photo"
          id="photo"
          className="form-control"
          onChange={onChange}
          required
        />
        <AddButton className="mt-3" value="Add Photo" />
      </form>
    </div>
  );
};

export default WorthPhotoForm;
