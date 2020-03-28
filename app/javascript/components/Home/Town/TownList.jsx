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
      refreshKey: false,
      adminMode: false
    };
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
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
      .then(this.setState({ refreshKey: true }))
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
          this.setState({
            townData: newTownData
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    console.log(this.props);

    const townData = this.state.townData;

    let listOfTowns = townData.map(element => {
      if (this.state.adminMode === true) {
        return (
          <React.Fragment key={element.id}>
            <Link
              to={`/towns/${element.id}`}
              className="dropdown-item navbar-underline"
            >
              {element.name}
            </Link>
          </React.Fragment>
        );
      } else {
        return (
          <div className="navbar-underline" key={element.id}>
            <div className="container">
              <div className="row">
                <Link to={`/towns/${element.id}`} className="col">
                  {element.name}
                </Link>
                <div className="col">
                  <FontAwesomeIcon
                    icon={["fas", "fa-trash"]}
                    className="iconfont mt-2"
                  />
                </div>
                <div className="col">edit</div>
              </div>
            </div>
          </div>
        );
      }
    });

    return <div>{listOfTowns}</div>;
  }
}

export default TownList;
