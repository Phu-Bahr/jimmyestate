import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch, putFetch } from "../../Constants/FetchComponent";
import { FormMaps } from "../../Constants/Constants";
import { UpdateButton } from "../../Constants/Buttons";
import { FadeIn } from "../../Constants/Constants";

const urlPath = "towns";

class EditTown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: null,
      name: "",
      headerText1: "",
      headerText2: "",
      townheader: "",
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
    const {
      name,
      headerText1,
      headerText2,
      townheader,
      bannerImage
    } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      townheader,
      bannerImage
    };

    putFetch(url, body, this.alertType);
  };

  mountState = body => {
    this.setState({
      townData: body,
      id: body.id,
      name: body.name,
      headerText1: body.headerText1,
      headerText2: body.headerText2,
      townheader: body.townheader,
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
          <div className="newTownWrapper">
            <div className="form">
              <header>
                <h1 className="mb-5">Edit your Town here.</h1>
              </header>

              <form onSubmit={this.onSubmit}>
                <FormMaps
                  formConst={dataForm}
                  onChange={this.onChange}
                  value={this.state}
                />

                <UpdateButton
                  className="mt-3"
                  value="Submit Town Header changes"
                />

                <Link
                  to={`/${urlPath}/${this.state.id}`}
                  className="btn btn-link mt-3"
                >
                  Back to Town
                </Link>
              </form>
            </div>
            {window.innerWidth > 680 && <div className="photo" />}
          </div>
        </FadeIn>
      </Fragment>
    );
  }
}

export default EditTown;
