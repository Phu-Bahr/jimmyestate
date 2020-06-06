import React, { Component } from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";
import { FadeIn } from "../../Constants/Constants";

class HelperLinks extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      townListData: [],
      helperListData: []
    };
  }

  onClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  componentDidMount() {
    this.fetchTownList();
    this.fetchHelperList();
  }

  fetchTownList() {
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
        this.setState({ townListData: body });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  fetchHelperList() {
    fetch("/api/v1/helper_links")
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
        this.setState({
          helperListData: body
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    console.log("helperlink state", this.state);

    let townlist = this.state.townListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link to={`/towns/${element.id}`} className="helperL py-1">
            {element.name}
          </Link>
        </div>
      );
    });

    let helperCards = this.state.helperListData.map(element => {
      return (
        <div key={element.id} className="col-md-6 col-middle py-2">
          <Link to={`/${element.route}`}>
            <div className="card border-0">
              <div className="parent m-0">
                <div className="child particles">
                  <img
                    className="venueImage card-img-top"
                    src={element.image}
                  />
                  <div className="venueTitle">{element.title}</div>
                </div>
              </div>
            </div>
          </Link>
          {!this.props.user.admin ? (
            <EditHelperLinks data={this.state.helperListData} />
          ) : null}
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 col-middle py-2">
            <div className="card border-0" onClick={this.onClick}>
              <div className="parent m-0">
                <div className="child particles">
                  <img
                    className="venueImage card-img-top"
                    src="https://lh3.googleusercontent.com/pw/ACtC-3fX36AGNlgvaqYaNLDdUMZPw7xXuOgORVB6qcCIt3cEDRvrlDXXzMKM_YFa4FteDWZVekUn4SBSgzkyllikMHJoC0gcX9WN47V0auJqFF8pHqRJAp8dtRlRKkHIQpujtN5sf4p6QeO1ynxzS9v_U1qdxA=w952-h634-no?authuser=0"
                  />
                  <div className="venueTitle">Communities of Expertise</div>
                </div>
              </div>
            </div>

            {this.state.visible ? (
              <FadeIn>
                <div className="card-body venueDetails container">
                  <div className="row">{townlist}</div>
                </div>
              </FadeIn>
            ) : null}
          </div>

          {helperCards}
        </div>
      </React.Fragment>
    );
  }
}

export default HelperLinks;
