import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../../Constants/Constants";
import { postFetch } from "../../Constants/FetchComponent";
import AlertBox from "../../Constants/AlertComponent";
import { FormMaps } from "../../Constants/Constants";
import { AddButton } from "../../Constants/Buttons";

const urlPath = "towns";

class NewTown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      headerText1: "",
      headerText2: "",
      townheader: "",
      content: null,
      bannerImage: "",
      typeOfAlert: null,
      idToAdd: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  refreshTownList = () => this.props.refreshTownList();
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  directToPath = () => {
    this.props.history.push(`/${urlPath}/${this.state.idToAdd}`);
    window.location.reload(false);
  };

  mountState = body => this.setState({ idToAdd: body.id });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const {
      name,
      headerText1,
      headerText2,
      townheader,
      content,
      bannerImage
    } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      townheader,
      content,
      bannerImage
    };

    postFetch(url, body, this.alertType, this.mountState);
  };

  render() {
    const dataForm = {
      name: "Edit your Town here.",
      bannerImage: "Banner Image URL",
      headerText1: "Header text 1",
      headerText2: "Header text 2",
      townheader: "Header for Links"
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
                  Add your new Community here.
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
                    value="Create Community"
                  />
                  <Link to="/" className="btn btn-link mt-3">
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

export default NewTown;
