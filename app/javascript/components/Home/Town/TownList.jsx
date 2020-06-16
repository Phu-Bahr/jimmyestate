import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: []
    };
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/towns")
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
        let newTownData = body;
        this.setState({ townData: newTownData });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.props.refreshKey === true) {
      fetch("api/v1/towns")
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
          this.setState({ townData: body });
        })
        .then(this.props.toggleRefreshFalse())
        .catch(error => console.log("error message =>", error.message));
    }
  }

  deleteEvent(id) {
    const url = `/api/v1/towns/${id}`;
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
      .then(this.props.toggleRefreshKey)
      .then(this.props.history.push("/"))
      // .then(window.location.reload(false))
      .catch(error => console.log(error.message));
  }

  render() {
    const townData = this.state.townData;

    let listOfTowns = townData.map(element => {
      let handleDelete = () => {
        let result = confirm(
          `Are you sure you want to delete ${element.name}?`
        );
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      if (this.props.user.admin === undefined) {
        // if (0 === 1) {
        return (
          <React.Fragment key={element.id}>
            <div className="container py-1">
              <Link
                to={`/towns/${element.id}`}
                className="dropdown-item navbar-underline"
              >
                {element.name}
              </Link>
            </div>
          </React.Fragment>
        );
      } else if (this.props.user.admin === true) {
        // } else if (0 === 0) {
        return (
          <React.Fragment key={element.id}>
            <div className="dropdown-item">
              <div className="row navbar-underline">
                <Link
                  to={`/towns/${element.id}`}
                  className="col-sm-4 ml-n1 mr-4"
                  style={{ fontSize: "13px" }}
                >
                  {element.name}
                </Link>
                <div className="col-sm-4 mr-n4">
                  <FontAwesomeIcon
                    icon="trash-alt"
                    size="2x"
                    onClick={handleDelete}
                  />
                </div>
                <div className="col-sm-4 m-auto">
                  <Link to={`/editcommunity/${element.id}`}>
                    <FontAwesomeIcon icon="edit" size="2x" />
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    });

    return <div>{listOfTowns}</div>;
  }
}

export default withRouter(TownList);
