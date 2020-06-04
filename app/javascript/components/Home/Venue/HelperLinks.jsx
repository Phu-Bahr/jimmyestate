import React, { Component } from "react";
import EditHelperLinks from "./EditHelperLinks";
import { Link } from "react-router-dom";

class HelperLinks extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
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
        </div>
      </React.Fragment>
    );
  }
}

export default HelperLinks;
