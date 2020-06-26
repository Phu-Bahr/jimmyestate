import React from "react";

export const PortfolioPropertyForm = props => {
  return (
    <React.Fragment>
      <form
        onSubmit={event => {
          props.onSubmit(event);
          event.target.reset();
        }}
        className="my-4"
      >
        <div className="form-row">
          <div className="form-group col-sm-9">
            <label htmlFor="photo">Photo URL</label>
            <input
              type="url"
              name="photo"
              id="photo"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.photo}
            />
          </div>
          <div className="form-group col-sm-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.price}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-4">
            <label htmlFor="streetnumber">Street Number</label>
            <input
              type="text"
              name="streetnumber"
              id="streetnumber"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.streetnumber}
            />
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              id="street"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.street}
            />
          </div>
          <div className="form-group col-sm-4">
            <label htmlFor="aptnumber">Apartment Number</label>
            <input
              type="text"
              name="aptnumber"
              id="aptnumber"
              className="form-control"
              onChange={props.onChange}
              value={props.value.aptnumber}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-5">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.city}
            />
          </div>
          <div className="form-group col-sm-2">
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              className="form-control"
              required
              onChange={props.onChange}
              value="MA"
            />
          </div>
          <div className="form-group col-sm-5">
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              name="zip"
              id="zip"
              className="form-control"
              required
              onChange={props.onChange}
              value={props.value.zip}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="status"
              required
              onChange={props.onChange}
              value="Active"
              checked={props.value.status === "Active"}
            />
            <label className="form-check-label" htmlFor="status">
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="status"
              required
              onChange={props.onChange}
              value="Sold"
              checked={props.value.status === "Sold"}
            />
            <label className="form-check-label" htmlFor="status">
              Sold
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="status"
              required
              onChange={props.onChange}
              value="Rental"
              checked={props.value.status === "Rental"}
            />
            <label className="form-check-label" htmlFor="status">
              Rental
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <button type="submit" className="btn custom-button mt-3">
              Add Property
            </button>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-info mt-3" onClick={props.onSubmitEdit}>
              Submit Change
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
