import React from "react";
import { FormMaps } from "../../Constants/Constants";
import { UpdateButton, AddButton } from "../../Constants/Buttons";

const formContent = {
  image: "Image",
  title: "Title",
  name: "Customer Info"
};

const TestimonialsForm = ({
  editMode,
  onEditTestimonial,
  onChange,
  onSubmit,
  description,
  value
}) => {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          {editMode ? (
            <h4 className="col text-center">Edit Testimonial</h4>
          ) : (
            <h4 className="col text-center">Add New Testimonial</h4>
          )}

          <form onSubmit={editMode ? onEditTestimonial : onSubmit}>
            <FormMaps
              formConst={formContent}
              onChange={onChange}
              value={value}
            />
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="5"
                className="form-control"
                type="text"
                id="description"
                name="description"
                onChange={onChange}
                value={description}
              />
            </div>

            {editMode ? (
              <UpdateButton value="Update Testimonial" className="mt-3" />
            ) : (
              <AddButton className="mt-3" value="Create Testimonial" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsForm;
