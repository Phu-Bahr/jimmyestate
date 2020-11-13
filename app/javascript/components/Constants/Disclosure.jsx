import React, { Fragment } from "react";
import DraftJSComponent from "./DraftJSComponent";

const urlPath = "disclosures";

const Disclosure = props => {
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

export default Disclosure;
