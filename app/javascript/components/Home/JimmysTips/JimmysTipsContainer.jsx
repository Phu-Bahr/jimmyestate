import React, { Component } from "react";
import DraftJSContainer from "../../Constants/DraftJSComponent";
import { FadeIn } from "../../Constants/Constants";

class JimmysTipsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "jimmy_tips"
    };
  }
  render() {
    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxJimmyTipPage">
            <div className="container py-5">
              <h1>Hi there</h1>
              <h4>helloooo there</h4>
            </div>
          </div>
        </FadeIn>
        <div>
          <DraftJSContainer {...this.state} user={this.props.user} />
        </div>
      </React.Fragment>
    );
  }
}

export default JimmysTipsContainer;
