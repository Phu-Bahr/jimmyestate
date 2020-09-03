import React, { Component, Fragment } from "react";
import DraftJSComponent from "./DraftJSComponent";

const urlPath = "privacy_policies";

const PrivacyPolicy = props => {
  return (
    <Fragment>
      <div className="container">
        <div className="privacyContent">
          <DraftJSComponent {...props} urlPath={urlPath} />
        </div>
      </div>
    </Fragment>
  );
};

export default PrivacyPolicy;
