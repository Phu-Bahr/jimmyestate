import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelperLinks from "./HelperLinks";
import NewHelperCard from "./NewHelperCard";
import { FadeIn } from "../../Constants/Constants";
import { animateScroll as scroll } from "react-scroll";
import VenueTemplate from "./VenueTemplate";

class VenueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townListData: [],
      helperListData: [],
      selectedStepId: null,
      refreshKey: false,
      bannerImage: "",
      visible: false
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  setSelectedStep(stepId) {
    if (this.state.selectedStepId === stepId) {
      this.setState({ selectedStepId: null });
    } else {
      this.setState({ selectedStepId: stepId });
    }
  }

  scrollToTop = () => {
    scroll.scrollToTop();
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

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
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
          this.setState({ helperListData: body });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  deleteCard(id) {
    const urls = `/api/v1/helper_links/${id}`;
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
    console.log("venuecontainer state", this.state);

    let cards = this.state.helperListData.map(element => {
      let handleClick = () => {
        let result = confirm("Are you sure?");
        if (result) {
          this.deleteCard(element.id);
        }
      };

      return (
        <HelperLinks
          key={element.id}
          id={element.id}
          image={element.image}
          title={element.title}
          route={element.route}
          handleClick={handleClick}
          toggleRefreshKey={this.toggleRefreshKey}
          user={this.props.user}
        />
      );
    });

    let townlist = this.state.townListData.map(element => {
      return (
        <div className="col-md-6" key={element.id}>
          <Link
            to={`/towns/${element.id}`}
            className="helperL py-1"
            onClick={this.scrollToTop}
          >
            {element.name}
          </Link>
        </div>
      );
    });

    return (
      <React.Fragment>
        <VenueTemplate user={this.props.user} />
        <div className="container pb-5 pt-2 px-5">
          {this.props.user.admin ? (
            <NewHelperCard toggleRefreshKey={this.toggleRefreshKey} />
          ) : null}

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

            {cards}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VenueContainer;
