import React, { Component } from "react";
import HelperLinks from "./HelperLinks";
import NewHelperCard from "./NewHelperCard";
import { animateScroll as scroll } from "react-scroll";
import VenueTemplate from "./VenueTemplate";
import CustomCards from "./CustomCards";

class VenueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperListData: [],
      selectedStepId: null,
      refreshKey: false,
      bannerImage: ""
    };
    this.deleteCard = this.deleteCard.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentDidMount() {
    this.fetchHelperList();
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

    return (
      <React.Fragment>
        <VenueTemplate user={this.props.user} />
        <div className="container pb-5 pt-2 px-5">
          {this.props.user.admin ? (
            <NewHelperCard toggleRefreshKey={this.toggleRefreshKey} />
          ) : null}

          <div className="row">
            <CustomCards user={this.props.user} />
            {cards}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VenueContainer;
