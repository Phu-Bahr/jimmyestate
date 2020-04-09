import React, { Component } from "react";

class AboutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutData: {}
    };
  }

  componentDidMount() {
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
        let newAboutData = body[0];
        this.setState({ aboutData: newAboutData });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    console.log("about--", this.state.aboutData);
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
    } = this.state.aboutData;

    return (
      <div>
        <div className="parallaxShowPage darken-pseudo darken-with-text">
          <div className="container py-5">
            <h1>{bannerText1}</h1>
            <h1>{bannerText2}</h1>
          </div>
        </div>

        <div className="container py-4">
          <div className="row">
            <div className="col-md-6">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
              <p>{paragraph3}</p>
              <p>{paragraph4}</p>
              <p>{paragraph5}</p>
              <p>{paragraph6}</p>
              <p>{paragraph7}</p>
              <p>{paragraph8}</p>
            </div>

            <div className="col-md-6">
              <div>{photo}</div>
              <div>{photoname}</div>
              <div>{photonumber}</div>
              <div>{photoemail}</div>
              <div>{photoaddress1}</div>
              <div>{photoaddress2}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutContainer;
