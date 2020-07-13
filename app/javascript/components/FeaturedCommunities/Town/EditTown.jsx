import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch, putFetch } from "../../Constants/FetchComponent";
import { FormMaps } from "../../Constants/Constants";
import { UpdateButton } from "../../Constants/Buttons";

const urlPath = "towns";

class EditTown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: "",
      name: "",
      headerText1: "",
      headerText2: "",
      townheader: "",
      bannerImage: "",
      typeOfAlert: null,
      refreshKey: false
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  refreshTownList = () => this.props.refreshTownList();
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
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

    putFetch(url, body, this.alertType)
      .then(this.refreshTownList())
      .then(this.toggleRefreshKey);
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

  componentDidMount() {
    let id = this.props.match.params.id;
    let url = `${urlPath}/${id}`;

    getFetch(url, this.mountState);
  }

  componentDidUpdate() {
    let id = this.props.match.params.id;
    let url = `${urlPath}/${id}`;

    this.state.id != id &&
      getFetch(url, this.mountState).then(this.setState({ refreshKey: false }));
  }

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
              <h1 className="font-weight-normal mb-5">Edit your Town here.</h1>

              <form onSubmit={this.onSubmit}>
                <FormMaps
                  formConst={dataForm}
                  onChange={this.onChange}
                  value={this.state}
                />

                <UpdateButton
                  className="mt-3"
                  type="submit"
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
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditTown;
