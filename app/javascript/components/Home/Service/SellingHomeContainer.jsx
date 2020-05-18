import React, { Component } from "react";
import { FadeIn } from "../../Constants/Constants";
import DraftJSContainer from "../../Constants/DraftJSComponent";

class SellingHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlGET: "selling_contents"
    };
  }

  render() {
    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxBuyingPage">
            <div className="container py-5">
              <h1>Hi there buying stuff here</h1>
              <h4>helloooo there</h4>
            </div>
          </div>
        </FadeIn>
        <div>
          <DraftJSContainer {...this.state} {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default SellingHomeContainer;
