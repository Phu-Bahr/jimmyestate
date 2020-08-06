import React from "react";
import { FormMaps } from "../../Constants/Constants";
import { UpdateButton } from "../../Constants/Buttons";

const marketFormData = {
  bannerImage: "Banner Image",
  bannerText1: "Banner Text 1",
  bannerText2: "Banner Text 2",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2"
};

const MarketReportsContentForm = ({ onChange, onSubmitEdit, value }) => {
  return (
    <div className="container">
      <form onSubmit={onSubmitEdit}>
        <FormMaps
          formConst={marketFormData}
          onChange={onChange}
          value={value}
        />
        <div className="pb-3">
          <UpdateButton />
        </div>
      </form>
    </div>
  );
};

export default MarketReportsContentForm;
