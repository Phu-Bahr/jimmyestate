import React, { Component } from "react";
import { Link } from "react-router-dom";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: ""
    };
    this.fetchTownData = this.fetchTownData.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchTownData(id);
  }

  fetchTownData(id) {
    fetch(`/api/v1/towns/${id}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ townData: body, id: body.id });
      });
  }

  componentDidUpdate() {
    if (this.state.id != this.props.match.params.id) {
      fetch(`/api/v1/towns/${this.props.match.params.id}`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ townData: body, id: body.id });
        });
    }
  }
  render() {
    return (
      <div>
        <div className="parallaxShowPage darken-pseudo darken-with-text">
          <div className="container py-5">
            <h1>Featured {this.state.townData.name} Real Estate</h1>
            <h4>{this.state.townData.headerText2}</h4>
          </div>
        </div>

        <div className="container py-4">
          <div className="pb-2">{this.state.townData.paragraph1}</div>
          <div className="pb-2">{this.state.townData.paragraph2}</div>
          <div className="pb-2">{this.state.townData.paragraph3}</div>
          <div className="pb-2">{this.state.townData.paragraph4}</div>
          <div>{this.state.townData.paragraph5}</div>
        </div>

        <div className="container pb-5">
          <div className="townheader-font">
            {this.state.townData.townheader}
          </div>
          <ul>
            <Link
              to={`//` + this.state.townData.townlink1}
              target="blank"
              className="link"
            >
              <li>{this.state.townData.name} Wiki</li>
            </Link>
            <Link
              to={`//` + this.state.townData.townlink2}
              target="blank"
              className="link"
            >
              <li>{this.state.townData.name} Schools</li>
            </Link>
            <Link
              to={`//` + this.state.townData.townlink3}
              target="blank"
              className="link"
            >
              <li>{this.state.townData.name} Website</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default TownShowPage;
