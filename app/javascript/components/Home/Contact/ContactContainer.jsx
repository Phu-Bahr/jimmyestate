import React, { Component } from "react";
import EmailForm from "./EmailForm";

class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: []
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
    console.log(this.state.contactData[0]);

    let contactData = this.state.contactData.map(element => {
      return (
        <div key={element.id}>
          <div>{element.photonumber}</div>
          <div>{element.photoemail}</div>
        </div>
      );
    });

    return (
      <div>
        <div className="parallaxContactPage darken-pseudo darken-with-text">
          <div className="container py-5">
            <h1>Contact Jimmy Chao</h1>
            <h4>Let's Talk and get you a house!</h4>
          </div>
        </div>

        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <EmailForm />
            </div>
            <div className="col-md-6">
              <div>{contactData}</div>
              <div>google maps here</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactContainer;
