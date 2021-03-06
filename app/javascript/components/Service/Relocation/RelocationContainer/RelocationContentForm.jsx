import React, { Fragment } from "react";
import { FormMaps } from "../../../Constants/Constants";
import { UpdateButton } from "../../../Constants/Buttons";

const relocationEditFormData = {
  bannerImage: "Banner Image",
  bannerText1: "Banner Text 1",
  bannerText2: "Banner Text 2",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2"
};

const RelocationContentForm = ({
  hideDiv,
  onSubmitEdit,
  onChange,
  value,
  admin
}) => {
  return (
    <Fragment>
      {hideDiv && admin && (
        <div className="container" style={{ borderStyle: "dotted" }}>
          <form onSubmit={onSubmitEdit}>
            <FormMaps
              formConst={relocationEditFormData}
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

export default RelocationContentForm;
