import React, { Fragment } from "react";
import { FormMaps } from "../../../Constants/Constants";
import { UpdateButton } from "../../../Constants/Buttons";

const homeWorthEditForm = {
  bannerImage: "Banner Image",
  bannerText1: "Banner Text 1",
  bannerText2: "Banner Text 2",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2"
};

const HomeWorthContentForm = ({ hideDiv, onSubmitEdit, onChange, value }) => {
  return (
    <Fragment>
      {hideDiv && (
        <div className="container" style={{ borderStyle: "dotted" }}>
          <form onSubmit={onSubmitEdit}>
            <FormMaps
              formConst={homeWorthEditForm}
              onChange={onChange}
              value={value}
            />
            <div className="pb-3">
              <UpdateButton />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default HomeWorthContentForm;
