import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      townlinkdescription3: ""
    };
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

  render() {
    const townData = this.state.townData;

    let listOfTowns = townData.map(element => {
      return (
        <Link
          to={`/towns/${element.id}`}
          key={element.id}
          className="dropdown-item navbar-underline"
        >
          {element.name}
        </Link>
      );
    });

    return <div>{listOfTowns}</div>;
  }
}

export default TownList;
