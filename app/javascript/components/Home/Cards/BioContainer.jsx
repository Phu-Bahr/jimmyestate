import React, { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import DraftJSContainer from "../../Constants/DraftJSComponent";

const urlPath = "card_drafts";

const BioContainer = props => {
  return (
    <Fragment>
      <ScrollAnimation animateIn="fadeIn">
        <DraftJSContainer
          {...props}
          urlPath={urlPath}
          alertType={props.alertType}
        />
      </ScrollAnimation>
    </Fragment>
  );
};

export default BioContainer;
