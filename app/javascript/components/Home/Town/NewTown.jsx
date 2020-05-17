import React from "react";
import { Link } from "react-router-dom";

class NewTown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      headerText1: "",
      headerText2: "",
      townheader: "",
      content: null
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
    const { name, headerText1, headerText2, townheader, content } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      townheader,
      content
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
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
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
                <label htmlFor="paragraph1">Paragraph 1</label>
                <textarea
                  rows="3"
                  type="text"
                  name="paragraph1"
                  id="paragraph1"
                  className="form-control"
                  value="Just a placeholder, fill in data on town link itself."
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
