import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      bannerImage: ""
    };
    this.fetchTownData = this.fetchTownData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refreshTownList = this.refreshTownList.bind(this);
  }

  refreshTownList(event) {
    this.props.refreshTownList();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = `/api/v1/towns/${this.state.id}`;
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
          alert("Town has been updated.");
          return response;
        } else {
          alert("Something went wrong");
          let errorMessage = `${resopnse.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(body => {
        this.props.history.push(`/towns/${this.state.id}`);
        // window.location.reload(false);
      })
      .then(this.refreshTownList())
      .then(window.scrollTo(0, 0))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchTownData(id);
  }

  componentDidUpdate() {
    let id = this.props.match.params.id;
    if (this.state.id != id) {
      this.fetchTownData(id);
    }
  }

  fetchTownData(id) {
    fetch(`/api/v1/towns/${id}`)
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
          townData: body,
          id: body.id,
          name: body.name,
          headerText1: body.headerText1,
          headerText2: body.headerText2,
          townheader: body.townheader,
          bannerImage: body.bannerImage
        });
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row pb-5">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Edit your Town here.</h1>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Town</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>

              <label htmlFor="bannerImage">Banner Image</label>
              <input
                type="text"
                name="bannerImage"
                id="bannerImage"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.bannerImage}
              />

              <label htmlFor="headerText1">headerText1</label>
              <input
                type="text"
                name="headerText1"
                id="headerText1"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.headerText1}
              />

              <label htmlFor="headerText2">headerText2</label>
              <input
                type="text"
                name="headerText2"
                id="headerText2"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.headerText2}
              />

              <div className="form-group">
                <label htmlFor="townheader">Townheader</label>
                <input
                  type="text"
                  name="townheader"
                  id="townheader"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townheader}
                  placeholder="ex: Town Links"
                />
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Submit Town changes
              </button>

              <Link
                to={`/towns/${this.state.id}`}
                className="btn btn-link mt-3"
              >
                Back to Town
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTown;
