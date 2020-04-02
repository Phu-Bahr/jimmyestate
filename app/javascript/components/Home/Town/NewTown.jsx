import React from "react";
import { Link } from "react-router-dom";

class NewTown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/towns";
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
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(body => {
        this.props.history.push(`/towns/${body.id}`);
        window.location.reload(false);
      })
      .then(window.scrollTo(0, 0))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add your new Community here.
            </h1>

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
                  placeholder="required"
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
                  placeholder="required"
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
                  placeholder="ex: Town Wikipedia"
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
                  placeholder="ex: www.wikipedia.com"
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
                />
              </div>

              <button type="submit" className="btn custom-button mt-3">
                Create Community
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

export default NewTown;
