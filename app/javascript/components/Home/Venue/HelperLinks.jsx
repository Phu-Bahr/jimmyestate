import React, { Component } from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";
import { FadeIn } from "../../Constants/Constants";

class HelperLinks extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      townListData: []
    };
  }

  onClick = () => {
    this.state.visible
      ? this.setState({ visible: false })
      : this.setState({ visible: true });
  };

  componentDidMount() {
    this.fetchTownList();
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

          <div className="col-md-6 col-middle py-2">
            <Link to="/contact">
              <div className="card border-0">
                <div className="parent m-0">
                  <div className="child particles">
                    <img
                      className="venueImage card-img-top"
                      src="https://media-public.canva.com/MADQ5DLPCW8/1/thumbnail_large-1.jpg"
                    />
                    <div className="venueTitle">Free Buyer's Consultation</div>
                  </div>
                </div>
              </div>
            </Link>
            {this.props.user.admin ? <EditHelperLinks /> : null}
          </div>

          <div className="col-md-6 col-middle py-2">
            <Link to="/selling-a-home">
              <div className="card border-0">
                <div className="parent m-0">
                  <div className="child particles">
                    <img
                      className="venueImage card-img-top"
                      src="https://media-public.canva.com/MADQ4w81t5E/1/thumbnail_large-1.jpg"
                    />
                    <div className="venueTitle">Listing Your Home</div>
                  </div>
                </div>
              </div>
            </Link>
            {this.props.user.admin ? <EditHelperLinks /> : null}
          </div>

          <div className="col-md-6 col-middle py-2">
            <Link to="/homeworth">
              <div className="card border-0">
                <div className="parent m-0">
                  <div className="child particles">
                    <img
                      className="venueImage card-img-top"
                      src="https://media-public.canva.com/MADQ5ITLjuE/1/thumbnail_large-1.jpg"
                    />
                    <div className="venueTitle">What's your Home worth?</div>
                  </div>
                </div>
              </div>
            </Link>
            {this.props.user.admin ? <EditHelperLinks /> : null}
          </div>

          <div className="col-md-6 col-middle py-2">
            <Link to="/market-reports">
              <div className="card border-0">
                <div className="parent m-0">
                  <div className="child particles">
                    <img
                      className="venueImage card-img-top"
                      src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    />
                    <div className="venueTitle">Market Reports</div>
                  </div>
                </div>
              </div>
            </Link>
            {this.props.user.admin ? <EditHelperLinks /> : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HelperLinks;
