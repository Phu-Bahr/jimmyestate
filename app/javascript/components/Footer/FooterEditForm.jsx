import React, { Fragment } from "react";
import { FormNoLabel } from "../Constants/Constants";
import { EditButton, UpdateButton } from "../Constants/Buttons";

const officeData = {
  name: "name",
  street: "street",
  citystate: "citystate"
};

const contactData = {
  contact1: "contact1",
  contact2: "contact2",
  contact3: "contact3",
  contact4: "contact4"
};

const socialData = {
  facebook: "facebook",
  twitter: "twitter",
  instagram: "instagram",
  other: "other",
  zillow: "zillow",
  realtor: "realtor"
};

const FooterEditForm = props => {
  return (
    <Fragment>
      <div className="col-sm-12 mt-5 text-center">
        <EditButton onClick={props.clickEdit} />
      </div>
      {!props.hideDiv && (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form onSubmit={props.onSubmit}>
                <FormNoLabel
                  data={officeData}
                  onChange={props.onChange}
                  value={props.value}
                />

                <UpdateButton className="mt-n3" value="Update Office" />
              </form>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form onSubmit={props.onSubmit}>
                <FormNoLabel
                  data={contactData}
                  onChange={props.onChange}
                  value={props.value}
                />

                <UpdateButton className="mt-n3" value="Update Contact Info" />
              </form>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 mt-3">
              <form onSubmit={props.onSubmit}>
                <FormNoLabel
                  data={socialData}
                  onChange={props.onChange}
                  value={props.value}
                />

                <UpdateButton className="mt-n3" value="Update Social" />
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FooterEditForm;
