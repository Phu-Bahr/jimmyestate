import React, { Fragment } from "react";
import { FormMaps } from "../../Constants/Constants";
import { UpdateButton } from "../../Constants/Buttons";

const parallaxFormContent = {
  bannerImage: "Banner Image",
  headerText1: "Header text 1",
  headerText2: "Header text 2",
  image: "Logo URL"
};

const AboutCompanyContentForm = ({ onChange, onSubmit, value }) => {
  return (
    <Fragment>
      <div className="container pb-5">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <form onSubmit={onSubmit}>
            <FormMaps
              formConst={parallaxFormContent}
              onChange={onChange}
              value={value}
            />

            <UpdateButton type="submit" className="mt-2" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutCompanyContentForm;
