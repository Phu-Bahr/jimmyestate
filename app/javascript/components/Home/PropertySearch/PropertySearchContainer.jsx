import React, { Component } from "react";

class PropertySearchContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onSubmit = () => {
    alert("Thanks for visiting my site, search be implemented soon!");
  };
  render() {
    return (
      <div>
        <div style={{ height: "300px" }} className="container text-center my-5">
          <h1>Property Search</h1>
          <div className="container">
            <form className="col-md-6 offset-lg-3" onSubmit={this.onSubmit}>
              <label>Search for Homes below</label>
              <input
                type="text"
                className="form-control m-3"
                placeholder="Work in progress"
              />
              <button type="submit"> Submit Search </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertySearchContainer;
