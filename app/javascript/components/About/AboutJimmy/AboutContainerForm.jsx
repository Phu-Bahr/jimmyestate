import React, { Fragment } from "react";
import { UpdateButton } from "../../Constants/Buttons";
import { FormMaps } from "../../Constants/Constants";

let paragraphForms = {
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2",
  paragraph3: "Paragraph 3",
  paragraph4: "Paragraph 4",
  paragraph5: "Paragraph 5",
  paragraph6: "Paragraph 6",
  paragraph7: "Paragraph 7",
  paragraph8: "Paragraph 8"
};

let photoForms = {
  photo: "Photo URL",
  photoname: "Name",
  photonumber: "Phone Number",
  photoemail: "Email",
  photoaddress1: "Street Address",
  photoaddress2: "City State Zip"
};

let bannerForms = {
  bannerImage: "Banner Image",
  bannerText1: "Banner Text 1",
  bannerText2: "Banner Text 2"
};

const AboutContainerForm = ({ onChange, onSubmit, hideDiv, value, admin }) => {
  return (
    <Fragment>
      {hideDiv && admin && (
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="container py-3">
              <FormMaps
                formConst={bannerForms}
                onChange={onChange}
                value={value}
              />
              <UpdateButton />
            </div>

            <div className="container py-3">
              <div className="row">
                <div className="col-md-9">
                  <FormMaps
                    formConst={paragraphForms}
                    onChange={onChange}
                    value={value}
                  />
                </div>
                <div className="col-md-3">
                  <FormMaps
                    formConst={photoForms}
                    onChange={onChange}
                    value={value}
                  />
                  <UpdateButton />
                </div>
              </div>

              <UpdateButton />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default AboutContainerForm;
