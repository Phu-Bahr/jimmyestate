import React, { Component } from "react";
import VenueTile from "./VenueTile";
import { Link } from "react-router-dom";

class VenueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      selectedStepId: null,
      refreshKey: false
    };
    this.deleteVenue = this.deleteVenue.bind(this);
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  setSelectedStep(stepId) {
    if (this.state.selectedStepId === stepId) {
      this.setState({ selectedStepId: null });
    } else {
      this.setState({ selectedStepId: stepId });
    }
  }

  componentDidMount() {
    fetch("/api/v1/venues/index")
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
        let newVenues = body;
        this.setState({ venues: newVenues });
      })
      .catch(() => this.props.history.push("/"));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("/api/v1/venues/index")
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
          let newVenues = body;
          this.setState({ venues: newVenues });
        })
        .then(this.setState({ refreshKey: false }))
        .catch(error => console.log(error.message));
    }
  }

  deleteVenue(id) {
    const urls = `/api/v1/destroy/${id}`;
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
    const venueData = this.state.venues;
    let venueList = venueData.map(venue => {
      let hideUpdate;
      if (venue.id === this.state.selectedStepId) {
        //using fadein and out will cause white space on footer.
        hideUpdate = "";
      } else {
        hideUpdate = "invisible";
      }

      let handleClick = () => {
        let result = confirm("Are you sure?");
        if (result) {
          this.deleteVenue(venue.id);
        }
      };

      let clickHideUpdate = () => {
        this.setSelectedStep(venue.id);
      };

      return (
        <VenueTile
          key={venue.id}
          id={venue.id}
          name={venue.name}
          street={venue.street}
          city={venue.city}
          state={venue.state}
          zip={venue.zip}
          telephone={venue.telephone}
          url={venue.url}
          venueImage={venue.venue_image}
          handleClick={handleClick}
          clickHideUpdate={clickHideUpdate}
          hideUpdate={hideUpdate}
          hideEditButton={this.props.hideEditButton}
          toggleRefreshKey={this.toggleRefreshKey}
        />
      );
    });

    return (
      <div id="venueTag" className="venueBackground">
        <div className="parallaxVenue"></div>

        <div className="container p-5">
          <div className={"col text-center" + " " + this.props.hideEditButton}>
            <Link to="/newVenue">
              <button type="button" className="btn-info mb-3">
                Add new venue
              </button>
            </Link>
          </div>

          <div className="row">{venueList}</div>
        </div>
      </div>
    );
  }
}

export default VenueContainer;
