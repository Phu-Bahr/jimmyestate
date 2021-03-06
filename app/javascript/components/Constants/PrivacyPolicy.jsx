import React, { Fragment } from "react";
import DraftJSComponent from "./DraftJSComponent";
import { userInfo } from "os";

const urlPath = "privacy_policies";

const PrivacyPolicy = props => {
  return (
    <Fragment>
      <div className="container">
        <div
          className={
            props.user.admin ? "privacyContentAdmin" : "privacyContent"
          }
        >
          <DraftJSComponent {...props} urlPath={urlPath} />
        </div>
      </div>
    </Fragment>
  );
};

export default PrivacyPolicy;
