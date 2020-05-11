import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { FadeIn, FadeInUp } from "../../Constants/Constants";

class AboutCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutData: [],
      id: "",
      bannerText1: "",
      bannerText2: "",
      paragraph1: "",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      paragraph5: "",
      paragraph6: "",
      paragraph7: "",
      paragraph8: "",
      photo: "",
      photoname: "",
      photonumber: "",
      photoemail: "",
      photoaddress1: "",
      photoaddress2: "",
      refreshKey: false,
      hideDiv: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  clickEdit(event) {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/about_companies/1";
    const {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      photo,
      photoname,
      photonumber,
      photoemail,
      photoaddress1,
      photoaddress2
    } = this.state;

    const body = {
      bannerText1,
      bannerText2,
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
      paragraph6,
      paragraph7,
      paragraph8,
      photo,
      photoname,
      photonumber,
      photoemail,
      photoaddress1,
      photoaddress2
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
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  componentDidMount() {
    fetch("/api/v1/about_companies")
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
        let newAboutCompanyData = body;
        this.setState({
          aboutData: newAboutCompanyData,
          id: newAboutCompanyData[0].id,
          bannerText1: newAboutCompanyData[0].bannerText1,
          bannerText2: newAboutCompanyData[0].bannerText2,
          paragraph1: newAboutCompanyData[0].paragraph1,
          paragraph2: newAboutCompanyData[0].paragraph2,
          paragraph3: newAboutCompanyData[0].paragraph3,
          paragraph4: newAboutCompanyData[0].paragraph4,
          paragraph5: newAboutCompanyData[0].paragraph5,
          paragraph6: newAboutCompanyData[0].paragraph6,
          paragraph7: newAboutCompanyData[0].paragraph7,
          paragraph8: newAboutCompanyData[0].paragraph8,
          photo: newAboutCompanyData[0].photo,
          photoname: newAboutCompanyData[0].photoname,
          photonumber: newAboutCompanyData[0].photonumber,
          photoemail: newAboutCompanyData[0].photoemail,
          photoaddress1: newAboutCompanyData[0].photoaddress1,
          photoaddress2: newAboutCompanyData[0].photoaddress2
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/about_companies")
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
          let newAboutCompanyData = body;
          this.setState({
            aboutData: newAboutCompanyData
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    console.log(this.props);

    let hideEditButton;
    if (this.props.user.admin === true) {
      hideEditButton = "";
    } else {
      // set below to blank string to default show edit buttons
      hideEditButton = "invisible";
    }

    let hide;
    if (this.state.hideDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let aboutData = this.state.aboutData;

    let banner = aboutData.map(element => {
      return (
        <div key={element.id}>
          <h1>{element.bannerText1}</h1>
          <h4>{element.bannerText2}</h4>
        </div>
      );
    });

    let paragraphs = aboutData.map(element => {
      return (
        <div key={element.id}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            {element.paragraph1}
          </p>
          <p>{element.paragraph2}</p>
          <p>{element.paragraph3}</p>
          <p>{element.paragraph4}</p>
          <p>{element.paragraph5}</p>
          <p>{element.paragraph6}</p>
          <p>{element.paragraph7}</p>
          <p>{element.paragraph8}</p>

          <div className="container mb-4">
            <div className="container">
              <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
                {element.photoname}
              </div>
            </div>
            <div className="container">
              <div>{element.photonumber}</div>
              <div>{element.photoemail}</div>
              <div>{element.photoaddress2}</div>
              <div>{element.photoaddress1}</div>
            </div>
          </div>
        </div>
      );
    });

    let photoArea = aboutData.map(element => {
      return (
        <div key={element.id}>
          <div className="m-5 text-center">
            <img className="img-fluid rounded" src={element.photo}></img>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxAboutCompanyPage darken-pseudo darken-with-text">
            <div className="container py-5">{banner}</div>
          </div>
        </FadeIn>
        <div className="container">
          <FadeInUp>
            <div className="">{photoArea}</div>
          </FadeInUp>
          <FadeIn>
            <div className="">{paragraphs}</div>
          </FadeIn>
        </div>

        <div className={"container py-3" + " " + hideEditButton}>
          <div className="row">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className={"container" + " " + hide}>
          <form onSubmit={this.onSubmit}>
            <div className="parallaxShowPage">
              <div className="container py-5">
                <div className="form-group">
                  <input
                    type="text"
                    name="bannerText1"
                    id="bannerText1"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.bannerText1}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="bannerText2"
                    id="bannerText2"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.bannerText2}
                  />
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="row">
                <div className="col-md-9">
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
                      required
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
                    <label htmlFor="paragraph6">Paragraph6</label>
                    <textarea
                      rows="3"
                      type="text"
                      name="paragraph6"
                      id="paragraph6"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.paragraph6}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paragraph7">Paragraph7</label>
                    <textarea
                      rows="3"
                      type="text"
                      name="paragraph7"
                      id="paragraph7"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.paragraph7}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paragraph8">Paragraph8</label>
                    <textarea
                      rows="3"
                      type="text"
                      name="paragraph8"
                      id="paragraph8"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.paragraph8}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="photo">photo</label>
                    <input
                      type="text"
                      name="photo"
                      id="photo"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photo}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoname">photoname</label>
                    <input
                      type="text"
                      name="photoname"
                      id="photoname"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photoname}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photonumber">photonumber</label>
                    <input
                      type="text"
                      name="photonumber"
                      id="photonumber"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photonumber}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoemail">photoemail</label>
                    <input
                      type="text"
                      name="photoemail"
                      id="photoemail"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photoemail}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoaddress1">photoaddress1</label>
                    <input
                      type="text"
                      name="photoaddress1"
                      id="photoaddress1"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photoaddress1}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoaddress2">photoaddress2</label>
                    <input
                      type="text"
                      name="photoaddress2"
                      id="photoaddress2"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.photoaddress2}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn custom-button mt-3"
                onClick={this.scrollToTop}
              >
                Submit changes
              </button>

              <Link to="/" className="btn btn-link mt-3">
                Back to Home Page
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutCompanyContainer;
