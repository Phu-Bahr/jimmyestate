import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import TownLinks from "./TownLinks";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: ""
    };
    this.fetchTownData = this.fetchTownData.bind(this);
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchTownData(id);
    this.scrollToTop();
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
      })
      .then(this.scrollToTop());
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
        })
        .then(this.scrollToTop());
    }
  }
  render() {
    return (
      <div>
        <div className="parallaxShowPage darken-pseudo darken-with-text">
          <div className="container py-5">
            <h1>{this.state.townData.headerText1}</h1>
            <h4>{this.state.townData.headerText2}</h4>
          </div>
        </div>

        <div className="container pt-5">
          <p className="">{this.state.townData.paragraph1}</p>
          <p className="">{this.state.townData.paragraph2}</p>
          <p className="">{this.state.townData.paragraph3}</p>
          <p className="">{this.state.townData.paragraph4}</p>
          <p className="">{this.state.townData.paragraph5}</p>
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
              <li>{this.state.townData.townlinkdescription1}</li>
            </Link>
            <Link
              to={`//` + this.state.townData.townlink2}
              target="blank"
              className="link"
            >
              <li>{this.state.townData.townlinkdescription2}</li>
            </Link>
            <Link
              to={`//` + this.state.townData.townlink3}
              target="blank"
              className="link"
            >
              <li>{this.state.townData.townlinkdescription3}</li>
            </Link>
            <TownLinks
              loggedInStatus={this.props.loggedInStatus}
              user={this.props.user}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default TownShowPage;
