import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FadeIn, FormMaps } from "../Constants/Constants";
import AlertBox from "../Constants/AlertComponent";
import { postFetch } from "../Constants/FetchComponent";
import { AddButton } from "../Constants/Buttons";

const urlPath = "partner_categories";
class NewPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      headerText1: "",
      headerText2: "",
      content: null,
      bannerImage: null,
      typeOfAlert: null,
      idToAdd: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  mountState = body => this.setState({ idToAdd: body.id });
  directToPath = () => {
    this.props.history.push(`/${urlPath}/${this.state.idToAdd}`);
    window.location.reload(false);
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const { name, headerText1, headerText2, content, bannerImage } = this.state;
    const body = { name, headerText1, headerText2, content, bannerImage };

    postFetch(url, body, this.alertType, this.mountState);
  };

  render() {
    const dataForm = {
      name: "Partner name (nav bar)",
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
        <FadeIn>
          <div
            className="parallaxStyleRoutes"
            style={{
              backgroundImage:
                "url(" +
                "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" +
                ")"
            }}
          />
          <div className="container my-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                  Add new partner here
                </h1>

                <form onSubmit={this.onSubmit}>
                  <FormMaps
                    formConst={dataForm}
                    onChange={this.onChange}
                    value={this.state}
                  />

                  <AddButton
                    type="submit"
                    className="mt-3"
                    value="Create Partner Category"
                  />

                  <Link to="/" className="btn btn-link mt-3 ">
                    Back to Home Page
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </Fragment>
    );
  }
}

export default NewPartner;
