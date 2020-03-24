import React, { Component } from "react";

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
        <div className="parallaxCompany">
          <div className="center">
            <h1 className="companyfont">{this.state.townData.headerText1}</h1>
            <h2 className="companyfont">{this.state.townData.headerText2}</h2>
          </div>
        </div>
        <br />
        <div>
          <div>{this.state.townData.paragraph1}</div>
          <div>{this.state.townData.paragraph2}</div>
          <div>{this.state.townData.paragraph3}</div>
          <div>{this.state.townData.paragraph4}</div>
          <div>{this.state.townData.paragraph5}</div>
        </div>
        <br />
        <div>
          <div>{this.state.townData.townheader}</div>
          <div>{this.state.townData.townlink1}</div>
          <div>{this.state.townData.townlink2}</div>
          <div>{this.state.townData.townlink3}</div>
        </div>

        <h1>Hi from town show page! container Page</h1>
      </div>
    );
  }
}

export default TownShowPage;
