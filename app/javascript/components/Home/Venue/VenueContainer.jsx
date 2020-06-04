import React, { Component } from "react";
import VenueTile from "./VenueTile";
import { Link } from "react-router-dom";
import { ParallaxBanner } from "../../Constants/Constants";
import HelperLinks from "./HelperLinks";

class VenueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      selectedStepId: null,
      refreshKey: false,
      bannerImage: ""
    };
    this.deleteVenue = this.deleteVenue.bind(this);
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
    this.fetchVenueList();
    this.fetchVenueEdits();
  }

  fetchVenueEdits() {
    fetch("/api/v1/venue_edits")
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
        this.setState({ bannerImage: body[0].bannerImage });
      });
  }

  fetchVenueList() {
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
      });
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

  onSubmitEdit(event) {
    event.preventDefault();
    // need to make url more dynamic than hard code 1
    const urls = "/api/v1/venue_edits/1";
    const { bannerImage } = this.state;

    const body = {
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("update complete");
          return response;
        } else {
          alert("something went wrong with update");
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

    // let bannerForm = (
    //   <div className="container pt-5">
    //     <div className="row">
    //       <div className="col-xs-12 col-sm-12 col-md-12 pb-5">
    //         <form onSubmit={this.onSubmitEdit}>
    //           <label htmlFor="bannerImage">Banner Image</label>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               name="bannerImage"
    //               id="bannerImage"
    //               className="form-control"
    //               onChange={this.onChange}
    //               value={this.state.bannerImage}
    //             />
    //           </div>

    //           <button type="submit" className="btn custom-button">
    //             Submit Update
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // );

    return (
      <React.Fragment>
        <div className="container p-5">
          <div className={"col text-center" + " " + this.props.hideEditButton}>
            <Link to="/newVenue">
              <button type="button" className="btn-info mb-3">
                Add new venue
              </button>
            </Link>
          </div>

          <div className="row">{venueList}</div>
          <hr style={{ border: "2px solid blue" }} />
          <HelperLinks user={this.props.user} />
        </div>
      </React.Fragment>
    );
  }
}

export default VenueContainer;
