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
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      paragraph5: "",
      townheader: "",
      townlink1: "",
      townlink2: "",
      townlink3: "",
      townlinkdescription1: "",
      townlinkdescription2: "",
      townlinkdescription3: ""
    };
    this.fetchTownData = this.fetchTownData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      townheader,
      townlink1,
      townlink2,
      townlink3,
      townlinkdescription1,
      townlinkdescription2,
      townlinkdescription3
    } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      townheader,
      townlink1,
      townlink2,
      townlink3,
      townlinkdescription1,
      townlinkdescription2,
      townlinkdescription3
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
          return response;
        } else {
          let errorMessage = `${resopnse.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(alert("Town has been updated."))
      .then(body => {
        this.props.history.push(`/towns/${this.state.id}`);
        window.location.reload(false);
      })
      .then(window.scrollTo(0, 0))
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchTownData(id);
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
          paragraph1: body.paragraph1,
          paragraph2: body.paragraph2,
          paragraph3: body.paragraph3,
          paragraph4: body.paragraph4,
          paragraph5: body.paragraph5,
          townheader: body.townheader,
          townlink1: body.townlink1,
          townlink2: body.townlink2,
          townlink3: body.townlink3,
          townlinkdescription1: body.townlinkdescription1,
          townlinkdescription2: body.townlinkdescription2,
          townlinkdescription3: body.townlinkdescription3
        });
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
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

              <div className="parallaxShowPage" style={{ color: "white" }}>
                <div className="container py-5">
                  <div className="">
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

                    <div className="">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="paragraph1">Paragraph1</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph1"
                  id="paragraph1"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.paragraph1}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paragraph2">Paragraph2</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph2"
                  id="paragraph2"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.paragraph2}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paragraph3">Paragraph3</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph3"
                  id="paragraph3"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.paragraph3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paragraph4">Paragraph4</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph4"
                  id="paragraph4"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.paragraph4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paragraph5">Paragraph5</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph5"
                  id="paragraph5"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.paragraph5}
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="townlinkdescription1">
                  Town Link Description 1
                </label>
                <input
                  type="text"
                  name="townlinkdescription1"
                  id="townlinkdescription1"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlinkdescription1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="townlink1">Town Link 1</label>
                <input
                  type="text"
                  name="townlink1"
                  id="townlink1"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlink1}
                />
              </div>

              <div className="form-group">
                <label htmlFor="townlinkdescription2">
                  Town Link Description 2
                </label>
                <input
                  type="text"
                  name="townlinkdescription2"
                  id="townlinkdescription2"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlinkdescription2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="townlink2">Town Link 2</label>
                <input
                  type="text"
                  name="townlink2"
                  id="townlink2"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlink2}
                />
              </div>

              <div className="form-group">
                <label htmlFor="townlinkdescription3">
                  Town Link Description 3
                </label>
                <input
                  type="text"
                  name="townlinkdescription3"
                  id="townlinkdescription3"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlinkdescription3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="townlink3">Town Link 3</label>
                <input
                  type="text"
                  name="townlink3"
                  id="townlink3"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  value={this.state.townlink3}
                />
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Submit Town changes
              </button>

              <Link to="/" className="btn btn-link mt-3">
                Back to Home Page
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTown;
