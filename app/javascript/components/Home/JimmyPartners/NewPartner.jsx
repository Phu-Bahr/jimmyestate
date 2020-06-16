import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { FadeIn } from "../../Constants/Constants";

class NewPartner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      headerText1: "",
      headerText2: "",
      content: null,
      bannerImage: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refreshTownList = this.refreshTownList.bind(this);
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  refreshTownList() {
    this.props.refreshTownList();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/partner_categories";
    const { name, headerText1, headerText2, content, bannerImage } = this.state;

    const body = {
      name,
      headerText1,
      headerText2,
      content,
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
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
        this.props.history.push(`/partner/${body.id}`);
        // window.location.reload(false); <-- refreshes page but logs off admin.
      })
      .then(this.refreshTownList())
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <React.Fragment>
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
                  <div className="form-group">
                    <label htmlFor="name">Type of Partner</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      required
                      onChange={this.onChange}
                      placeholder="This will be on the nav bar"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bannerImage">Banner Image</label>
                    <input
                      type="text"
                      name="bannerImage"
                      id="bannerImage"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="headerText1">headerText1</label>
                    <input
                      type="text"
                      name="headerText1"
                      id="headerText1"
                      className="form-control"
                      required
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
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

                  <button type="submit" className="btn custom-button mt-3">
                    Create Partner Category
                  </button>

                  <Link
                    to="/"
                    className="btn btn-link mt-3 
                onClick={this.scrollToTop}"
                  >
                    Back to Home Page
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default NewPartner;
