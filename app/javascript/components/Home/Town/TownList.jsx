import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TownList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: [],
      name: "",
      headerText1: "",
      headerText2: "",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      paragraph5: "",
      townheader: "",
      townlink1: "",
      townlink2: "",
      townlink3: "",
      townlinkdescription1: "",
      townlinkdescription2: "",
      townlinkdescription3: "",
      refreshKey: false
    };
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
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
    if (this.state.refreshKey === true) {
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
          let newTownData = body;
          this.setState({ townData: newTownData });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log("error message =>", error.message));
    }
  }

  deleteEvent(id) {
    const urls = `/api/v1/towns/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
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

  render() {
    const townData = this.state.townData;

    let listOfTowns = townData.map(element => {
      let handleDelete = () => {
        let result = confirm("Are you sure?");
        if (result) {
          this.deleteEvent(element.id);
        }
      };

      if (this.props.user.admin === undefined) {
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
        return (
          <React.Fragment key={element.id}>
            <div className="container dropdown-item">
              <div className="row navbar-underline">
                <Link to={`/towns/${element.id}`} className="col-sm-4 ">
                  {element.name}
                </Link>
                <div className="col-sm-4 pl-4">
                  <FontAwesomeIcon icon="trash-alt" onClick={handleDelete} />
                </div>
                <div className="col-sm-4">
                  <Link to={`/editcommunity/${element.id}`}>
                    <FontAwesomeIcon icon="edit" />
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

export default TownList;
