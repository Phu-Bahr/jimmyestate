import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../Constants/AlertComponent";
import { getFetch, putFetch } from "../Constants/FetchComponent";
import { FormMaps } from "../Constants/Constants";
import { UpdateButton } from "../Constants/Buttons";

const urlPath = "partner_categories";

class EditPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerData: {},
      id: null,
      name: "",
      headerText1: "",
      headerText2: "",
      bannerImage: "",
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  directToPath = () => {
    this.props.history.push(`/${urlPath}/${this.state.id}`);
    window.location.reload(false);
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { name, headerText1, headerText2, bannerImage } = this.state;
    const body = { name, headerText1, headerText2, bannerImage };

    putFetch(url, body, this.alertType);
  };

  mountState = body => {
    this.setState({
      partnerData: body,
      id: body.id,
      name: body.name,
      headerText1: body.headerText1,
      headerText2: body.headerText2,
      bannerImage: body.bannerImage
    });
  };
  componentDidMount = () => {
    let id = this.props.match.params.id;
    let url = `${urlPath}/${id}`;
    getFetch(url, this.mountState);
  };

  componentDidUpdate = () => {
    let id = this.props.match.params.id;
    let url = `${urlPath}/${id}`;

    this.state.id != id && getFetch(url, this.mountState);
  };

  render() {
    const dataForm = {
      name: "Edit your Partner here.",
      bannerImage: "Banner Image URL",
      headerText1: "Header text 1",
      headerText2: "Header text 2"
    };

    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          directToPath={this.directToPath}
        />
        <div
          className="parallaxStyleRoutes"
          style={{
            backgroundImage:
              "url(" +
              "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" +
              ")"
          }}
        />
        <div className="container mt-5">
          <div className="row pb-5">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Edit Partner here.</h1>

              <form onSubmit={this.onSubmit}>
                <FormMaps
                  formConst={dataForm}
                  onChange={this.onChange}
                  value={this.state}
                />

                <UpdateButton className="mt-3" value="Submit Partner changes" />

                <Link
                  to={`/${urlPath}/${this.state.id}`}
                  className="btn btn-link mt-3"
                  onClick={this.scrollToTop}
                >
                  Back to Partner
                </Link>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditPartner;
