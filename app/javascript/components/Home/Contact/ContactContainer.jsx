import React, { Component } from "react";
import EmailForm from "./EmailForm";
import Map from "./Map";
import { FadeIn, FadeInLeft, FadeInRight } from "../../Constants/Constants";

class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
      geoData: []
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
        let newContactData = body;
        this.setState({
          contactData: newContactData
        });
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    let contactData = this.state.contactData.map(element => {
      return (
        <div key={element.id}>
          <div>{element.photonumber}</div>
          <div>{element.photoemail}</div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxContactPage">
            <div className="container py-5">
              <h1>Contact Jimmy Chao</h1>
              <h4>Let's Talk and get you a house!</h4>
            </div>
          </div>
        </FadeIn>

        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 pb-3">
              <FadeInLeft>
                <EmailForm />
              </FadeInLeft>
            </div>
            <div className="col-md-6">
              <FadeInRight>
                <div className="text-center pb-3">{contactData}</div>
              </FadeInRight>
              <div>
                <FadeInRight>
                  <Map />
                </FadeInRight>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactContainer;
