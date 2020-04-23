import React, { Component } from "react";

class ServiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <h1>Services coming to you soon!</h1>
          <img src="https://i0.wp.com/www.palmbeachcountycta.org/wp-content/uploads/2017/10/website-construction-graphic-4.jpg?fit=1024%2C453" />
        </div>
      </div>
    );
  }
}

export default ServiceContainer;
