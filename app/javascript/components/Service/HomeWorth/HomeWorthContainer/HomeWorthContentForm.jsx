import React from "react";
import { FormMaps } from "../../../Constants/Constants";
import { UpdateButton } from "../../../Constants/Buttons";

const homeWorthEditForm = {
  bannerImage: "Banner Image",
  bannerText1: "Banner Text 1",
  bannerText2: "Banner Text 2",
  paragraph1: "Paragraph 1",
  paragraph2: "Paragraph 2"
};

const HomeWorthContentForm = props => {
  return (
    <React.Fragment>
      {props.hideDiv ? (
        <div className="container">
          <form onSubmit={props.onSubmitEdit}>
            <FormMaps
              formConst={homeWorthEditForm}
              onChange={props.onChange}
              value={props.value}
            />
            <div className="pb-3">
              <UpdateButton type="submit" />
            </div>
          </form>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default HomeWorthContentForm;
