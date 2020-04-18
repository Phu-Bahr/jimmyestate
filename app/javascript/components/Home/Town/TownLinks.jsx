import React, { Component } from "react";
import { Link } from "react-router-dom";

class TownLinks extends Component {
  constructor() {
    super();
    this.state = {
      townLinkData: [],
      id: "",
      townlink: "",
      townlinkdescription: "",
      refreshKey: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/town_links";
    const { townlink, townlinkdescription } = this.state;

    const body = {
      townlink,
      townlinkdescription
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/town_links")
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
        let newTownLinkData = body;
        this.setState({
          townLinkData: newTownLinkData
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/town_links")
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
          let newTownLinkData = body;
          this.setState({ townLinkData: newTownLinkData });
        })
        // refresh key won't work
        .then(window.location.reload(false))
        .catch(error => console.log("error message =>", error.message));
    }
  }

  render() {
    console.log("townlink state", this.state.townLinkData);
    console.log("props from townlink", this.props);

    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      hideEditButton = "invisible";
    }

    let townData = this.state.townLinkData;
    let displayLinks = townData.map(element => {
      return (
        <div key={element.id}>
          <Link to={`//` + element.townlink} target="blank" className="link">
            <li>{element.townlinkdescription}</li>
          </Link>
        </div>
      );
    });

    return (
      <div className={hideEditButton}>
        <div>test links and forms, not finished yet.</div>
        <div>{displayLinks}</div>

        <form onSubmit={this.onSubmit} className="my-4">
          <div className="form-group">
            <label htmlFor="townlink">Town Link</label>
            <input
              type="text"
              name="townlink"
              id="townlink"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="ex: www.wikipedia.com, **only use www or http(s) in front of it."
            />
          </div>
          <div className="form-group">
            <label htmlFor="townlinkdescription">Town Link Description</label>
            <input
              type="text"
              name="townlinkdescription"
              id="townlinkdescription"
              className="form-control"
              required
              onChange={this.onChange}
              placeholder="ex: Town Wikipedia"
            />
          </div>
          <button type="submit" className="btn custom-button">
            Create Town Link
          </button>
        </form>
      </div>
    );
  }
}

export default TownLinks;
