import React, { Component } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import {
  FadeIn,
  ParallaxBannerRoutes,
  FormMaps
} from "../../Constants/Constants";
import { RollBoxLoading } from "react-loadingg";

class AboutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutData: [],
      id: null,
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
      hideDiv: true,
      bannerImage: "",
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  clickEdit() {
    if (this.state.hideDiv === false) {
      this.setState({ hideDiv: true });
    } else {
      this.setState({ hideDiv: false });
    }
  }

  toggleRefreshKey() {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/abouts/1";
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
      photoaddress2,
      bannerImage
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
      photoaddress2,
      bannerImage
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
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
    this.setState({ loading: true });
    fetch("/api/v1/abouts")
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
          aboutData: body,
          id: body[0].id,
          bannerText1: body[0].bannerText1,
          bannerText2: body[0].bannerText2,
          paragraph1: body[0].paragraph1,
          paragraph2: body[0].paragraph2,
          paragraph3: body[0].paragraph3,
          paragraph4: body[0].paragraph4,
          paragraph5: body[0].paragraph5,
          paragraph6: body[0].paragraph6,
          paragraph7: body[0].paragraph7,
          paragraph8: body[0].paragraph8,
          photo: body[0].photo,
          photoname: body[0].photoname,
          photonumber: body[0].photonumber,
          photoemail: body[0].photoemail,
          photoaddress1: body[0].photoaddress1,
          photoaddress2: body[0].photoaddress2,
          bannerImage: body[0].bannerImage
        });
      })
      .then(this.setState({ loading: false }))
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey) {
      fetch("api/v1/abouts")
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
            aboutData: body,
            id: body[0].id,
            bannerText1: body[0].bannerText1,
            bannerText2: body[0].bannerText2,
            paragraph1: body[0].paragraph1,
            paragraph2: body[0].paragraph2,
            paragraph3: body[0].paragraph3,
            paragraph4: body[0].paragraph4,
            paragraph5: body[0].paragraph5,
            paragraph6: body[0].paragraph6,
            paragraph7: body[0].paragraph7,
            paragraph8: body[0].paragraph8,
            photo: body[0].photo,
            photoname: body[0].photoname,
            photonumber: body[0].photonumber,
            photoemail: body[0].photoemail,
            photoaddress1: body[0].photoaddress1,
            photoaddress2: body[0].photoaddress2,
            bannerImage: body[0].bannerImage
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    let hide;
    if (this.state.hideDiv === true) {
      hide = "invisible";
    } else {
      hide = "";
    }

    let aboutData = this.state.aboutData;

    let paragraphs = aboutData.map(element => {
      return (
        <div key={element.id}>
          <p>{element.paragraph1}</p>
          <p>{element.paragraph2}</p>
          <p>{element.paragraph3}</p>
          <p>{element.paragraph4}</p>
          <p>{element.paragraph5}</p>
          <p>{element.paragraph6}</p>
          <p>{element.paragraph7}</p>
          <p>{element.paragraph8}</p>
        </div>
      );
    });

    let photoArea = aboutData.map(element => {
      return (
        <div key={element.id}>
          <div>
            <img className="img-fluid rounded" src={element.photo}></img>
          </div>

          <div className="container mt-3 text-center">
            <div className="container">
              <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
                {element.photoname}
              </div>
            </div>
            <div className="container mt-2">
              <div>{element.photonumber}</div>
              <div>{element.photoemail}</div>
              <div>{element.photoaddress1}</div>
              <div>{element.photoaddress2}</div>
            </div>
          </div>
        </div>
      );
    });

    let paragraphForms = {
      paragraph1: "Paragraph 1",
      paragraph2: "Paragraph 2",
      paragraph3: "Paragraph 3",
      paragraph4: "Paragraph 4",
      paragraph5: "Paragraph 5",
      paragraph6: "Paragraph 6",
      paragraph7: "Paragraph 7",
      paragraph8: "Paragraph 8"
    };

    let photoForms = {
      photo: "Photo URL",
      photoname: "Name",
      photonumber: "Phone Number",
      photoemail: "Email",
      photoaddress1: "Street Address",
      photoaddress2: "City State Zip"
    };

    let bannerForms = {
      bannerImage: "Banner Image",
      bannerText1: "Banner Text 1",
      bannerText2: "Banner Text 2"
    };

    let formInput = (
      <div className={"container" + " " + hide}>
        <form onSubmit={this.onSubmit}>
          <div className="parallaxShowPage">
            <div className="container py-5">
              <FormMaps
                formConst={bannerForms}
                onChange={this.onChange}
                value={this.state}
              />
            </div>
          </div>

          <div className="container py-5">
            <div className="row">
              <div className="col-md-9">
                <FormMaps
                  formConst={paragraphForms}
                  onChange={this.onChange}
                  value={this.state}
                />
              </div>
              <div className="col-md-3">
                <FormMaps
                  formConst={photoForms}
                  onChange={this.onChange}
                  value={this.state}
                />
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
    );

    return (
      <React.Fragment>
        <div className="flex-container">
          <FadeIn>
            {this.state.loading ? (
              <RollBoxLoading />
            ) : (
              <ParallaxBannerRoutes
                bannerImage={this.state.bannerImage}
                headerText1={this.state.bannerText1}
                headerText2={this.state.bannerText2}
                id={this.state.id}
              />
            )}
            <div className="container">
              <div className="row py-5">
                <div className="col-md-12">
                  <div className="float-left ml-4 pr-4 mb-3">{photoArea}</div>
                  <div className="">{paragraphs}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {this.props.user.admin ? (
            <div className="container pb-3">
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
          ) : null}

          {formInput}
        </div>
      </React.Fragment>
    );
  }
}

export default AboutContainer;
