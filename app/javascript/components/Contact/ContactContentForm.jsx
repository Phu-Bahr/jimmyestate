import React from "react";
import { UpdateButton, EditButton } from "../Constants/Buttons";
import { FormMaps } from "../Constants/Constants";

const bannerFormContent = {
  bannerImage: "Banner Image",
  headerText1: "Header text 1",
  headerText2: "Header text 2"
};

const dataFormContent = {
  name: "Name",
  address: "Address",
  phonenumber: "Phone Number",
  email: "Email",
  lat: "Latitude",
  lng: "Longitude"
};

const ContactContentForm = ({ value, onChange, onSubmit, onUpdateGeocode }) => {
  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="text-center pb-3">
            <EditButton type="submit" value="Submit Header Changes" />
          </div>
          <div className="form-row">
            <div className="col-md-6">
              <FormMaps
                formConst={bannerFormContent}
                onChange={onChange}
                value={value}
              />
            </div>
            <div className="col-md-6">
              <FormMaps
                formConst={dataFormContent}
                onChange={onChange}
                value={value}
              />
              <div className="py-3">
                <UpdateButton
                  type="button"
                  value="Update Geocode"
                  onClick={onUpdateGeocode}
                />
                *Submit Header Changes after update
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactContentForm;
