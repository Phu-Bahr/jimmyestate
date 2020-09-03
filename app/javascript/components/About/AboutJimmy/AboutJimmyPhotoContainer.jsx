import React, { Fragment } from "react";
import { gaContactLinks } from "../../Constants/GoogleAnalyticEvents";

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
        <img
          className="img-fluid rounded"
          src={photo}
          alt="Jimmy Chao Photo"
          style={{
            boxShadow: "0px 10px 13px -7px #000000",
            width: "300px",
            height: "400px"
          }}
        />
        <div className="container mt-3 text-center">
          <div className="container">
            <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
              {photoname}
            </div>
          </div>
          <div className="container mt-2">
            <div>
              <a
                href={`tel: ` + photonumber}
                style={{ color: "black" }}
                onClick={() => gaContactLinks("Phone About Page")}
              >
                <div className="fa fa-phone pr-2 contact-icons" />
                {photonumber}
              </a>
            </div>
            <div>
              <a
                href={`mailto:` + photoemail}
                style={{ color: "black" }}
                onClick={() => gaContactLinks("Email About Page")}
              >
                <div className="fa fa-envelope pr-2 contact-icons" />
                {photoemail}
              </a>
            </div>
            <div>{photoaddress1}</div>
            <div>{photoaddress2}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutJimmyPhotoContainer;
