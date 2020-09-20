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
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  mountState = body => this.setState({ idToAdd: body.id });
  directToPath = () => {
    this.props.history.push(`/${urlPath}/${this.state.idToAdd}`);
    window.location.reload(false);
  };

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
      name: "Town name (nav bar)",
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
          <div className="newTownWrapper">
            <div className="form">
              <header>
                <h1 className="mb-5">Add your new Community here.</h1>
              </header>

              <form onSubmit={this.onSubmit}>
                <FormMaps
                  formConst={dataForm}
                  onChange={this.onChange}
                  value={this.state}
                />

                <AddButton className="mt-3" value="Create Community" />

                <Link to="/" className="btn btn-link mt-3">
                  Back to Home Page
                </Link>
              </form>
            </div>
            {window.innerWidth > 768 && <div className="photo" />}
          </div>
        </FadeIn>
      </Fragment>
    );
  }
}

export default NewTown;
