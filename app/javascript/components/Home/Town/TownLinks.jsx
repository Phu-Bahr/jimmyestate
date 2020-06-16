import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TownLinks extends Component {
  constructor() {
    super();
    this.state = {
      townLinkData: [],
      id: "",
      townlink: "",
      townlinkdescription: "",
      refreshKey: false,
      townlinkID: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
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
    const url = `/api/v1/towns/${town_id}/town_links`;
    const { townlink, townlinkdescription } = this.state;

    const body = {
      townlink,
      townlinkdescription
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
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
      .then(
        this.setState({ townlink: "", townlinkdescription: "", townlinkID: "" })
      )
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  onSubmitEdit(event) {
    if (this.state.townlinkID === "") {
      alert("Nothing to edit");
    } else {
      event.preventDefault();
      const url = `/api/v1/towns/${this.props.paramID}/town_links/${this.state.townlinkID}`;
      const { townlink, townlinkdescription, townlinkID } = this.state;

      const body = {
        townlink,
        townlinkdescription,
        townlinkID
      };

      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${resopnse.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(alert("Town Link has been updated."))
        .then(
          this.setState({
            townlink: "",
            townlinkdescription: "",
            townlinkID: ""
          })
        )
        .then(this.toggleRefreshKey)
        .catch(error => console.log(error.message));
    }
  }

  deleteEvent(id) {
    const url = `/api/v1/towns/${this.props.paramID}/town_links/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
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
      let handleDelete = () => {
        let result = confirm(
          `Are you sure you want to delete ${element.townlink}?`
        );
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      let handleEdit = () => {
        this.setState({
          townlinkID: element.id,
          townlink: element.townlink,
          townlinkdescription: element.townlinkdescription
        });
      };
      return (
        <React.Fragment key={element.id}>
          <div className="row">
            <div className="col-sm-6">
              <Link
                to={`//` + element.townlink}
                target="blank"
                className="link"
              >
                <li>{element.townlinkdescription}</li>
              </Link>
            </div>
            <div className={"col-xs-4 px-5" + " " + hideEditButton}>
              <FontAwesomeIcon
                icon="trash-alt"
                size="1x"
                onClick={handleDelete}
              />
            </div>
            <div className={"col-xs-4" + " " + hideEditButton}>
              <FontAwesomeIcon icon="edit" size="1x" onClick={handleEdit} />
            </div>
          </div>
        </React.Fragment>
      );
    });

    return (
      <div>
        <div>{displayLinks}</div>
        <div className={hideEditButton}>
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
                value={this.state.townlink}
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
                value={this.state.townlinkdescription}
              />
            </div>
            <button type="submit" className="btn custom-button">
              Create Town Link
            </button>
          </form>

          <button
            type="submit"
            className="btn btn-info"
            onClick={this.onSubmitEdit}
          >
            Submit Town Link Changes
          </button>
        </div>
      </div>
    );
  }
}

export default TownLinks;
