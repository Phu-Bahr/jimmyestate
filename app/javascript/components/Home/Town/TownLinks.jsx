import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

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

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    let town_id = this.props.paramID;
    const urls = `/api/v1/towns/${town_id}/town_links`;
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
    fetch(`/api/v1/towns/${this.props.paramID}/town_links`)
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
        console.log("BODY townlinks didmount =====>", body);
        let newTownLinkData = body;
        this.setState({
          townLinkData: newTownLinkData,
          id: newTownLinkData[0].town_id
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.id != this.props.paramID) {
      fetch(`/api/v1/towns/${this.props.paramID}/town_links`)
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
          console.log("BODY townlinks DIDUPDATE =====>", body);
          let newTownLinkData = body;
          this.setState({
            townLinkData: newTownLinkData,
            id: newTownLinkData[0].town_id,
            refreshKey: false
          });
        });
    } else if (this.state.refreshKey === true) {
      fetch(`/api/v1/towns/${this.props.paramID}/town_links`)
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
            townLinkData: newTownLinkData,
            id: newTownLinkData[0].town_id,
            refreshKey: false
          });
        });
    }
  }

  render() {
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
      <div>
        <div className={hideEditButton}>
          <div>test links and forms, not finished yet.</div>
          <div>{displayLinks}</div>
          <form
            onSubmit={event => {
              this.onSubmit(event);
              event.target.reset();
            }}
            className="my-4"
          >
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
      </div>
    );
  }
}

export default TownLinks;
