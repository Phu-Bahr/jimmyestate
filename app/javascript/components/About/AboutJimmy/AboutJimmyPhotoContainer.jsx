import React, { Fragment } from "react";

const AboutJimmyPhotoContainer = ({
  photo,
  photoname,
  photonumber,
  photoemail,
  photoaddress1,
  photoaddress2
}) => {
  return (
    <Fragment>
      <div className="float-left ml-4 pr-4 mb-3">
        <div>
          <img className="img-fluid rounded" src={photo}></img>
        </div>

        <div className="container mt-3 text-center">
          <div className="container">
            <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
              {photoname}
            </div>
          </div>
          <div className="container mt-2">
            <div>{photonumber}</div>
            <div>{photoemail}</div>
            <div>{photoaddress1}</div>
            <div>{photoaddress2}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutJimmyPhotoContainer;
