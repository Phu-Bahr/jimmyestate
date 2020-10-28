import React, { Fragment } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { relative } from "upath";

const payload = null;

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert
      title={
        <figure className="alert-modal-wrapper">
          <img
            className="alert-image-modal"
            src="https://media2.giphy.com/media/AgO9VR2a9KW1MSP73I/200.gif"
            alt="Deleted Gif confirmation photo"
          />
          <br />
          <figcaption>Deleted!</figcaption>
        </figure>
      }
      onConfirm={() => props.alertType(payload)}
    >
      Your content has been deleted.
    </SweetAlert>
  );

  const successfulAdd = (
    <SweetAlert
      success
      title="Success!"
      onConfirm={
        props.directToPath
          ? () => props.directToPath()
          : () => props.alertType(payload)
      }
    >
      Your content has been added.
    </SweetAlert>
  );

  const successfulEmail = (
    <SweetAlert
      title={
        <figure className="alert-modal-wrapper">
          <img
            className="alert-image-modal"
            src="https://cdn.dribbble.com/users/4874/screenshots/1776423/inboxiconanimation_30.gif"
            alt="Sent confirmation photo"
          />
          <br />
          <figcaption>SENT</figcaption>
        </figure>
      }
      onConfirm={() => props.alertType(payload)}
    >
      <div className="container">
        Jimmy has received your inquiry and will get back to you as soon as he
        can!
      </div>
    </SweetAlert>
  );

  const successfulEdit = (
    <SweetAlert
      success
      title={
        <div style={{ position: "relative", zIndex: "1" }}>"Success!"</div>
      }
      onConfirm={
        props.directToPath
          ? () => props.directToPath()
          : () => props.alertType(payload)
      }
    >
      Your content has been updated.
    </SweetAlert>
  );

  const deleteItem = (
    <SweetAlert
      showCancel
      confirmBtnText="Delete"
      confirmBtnBsStyle="danger"
      title={
        <figure className="alert-modal-wrapper">
          <img
            className="alert-image-modal"
            src="https://media.tenor.com/images/4d641863b305acb3f6e6022fdfa299c0/tenor.gif"
            alt="Are you sure? confirmation photo"
          />
          <br />
          <figcaption>Are you sure?</figcaption>
        </figure>
      }
      onConfirm={() => props.deleteEvent(props.idForAlert)}
      onCancel={() => props.alertType(payload)}
      focusCancelBtn
    ></SweetAlert>
  );

  const errorMessage = (
    <SweetAlert error title="ERROR" onConfirm={() => props.alertType(payload)}>
      Error occurred. Contact Administrator or Jimmy.
    </SweetAlert>
  );

  const errorGeocode = (
    <SweetAlert
      title={
        <Fragment>
          <figure className="alert-modal-wrapper">
            <img
              className="alert-image-modal"
              src="https://media0.giphy.com/media/aN9GqoR7OD3nq/200.gif"
              alt="Geocode does not exist Photo"
            />
            <br />
            <figcaption>Location does not exist on Earth!</figcaption>
          </figure>
        </Fragment>
      }
      onConfirm={() => props.alertType(payload)}
    >
      Try a valid address.
    </SweetAlert>
  );

  const successfulGeocode = (
    <SweetAlert
      title={
        <figure className="alert-modal-wrapper">
          <img
            className="alert-image-modal"
            src="https://media1.giphy.com/media/9FXA260svGMw3QRFC8/giphy.gif"
            alt="Geocode found photo"
          />
          <br />
          <figcaption>Geocode Found!!</figcaption>
        </figure>
      }
      onConfirm={() => props.alertType(payload)}
    >
      Geocode has been updated to the database.
    </SweetAlert>
  );

  const successfulGeocodeEvent = (
    <SweetAlert title="Event Submitted!" onConfirm={() => props.submitEvent()}>
      Geocode has been updated to the database.
    </SweetAlert>
  );

  const successfulLogin = (
    <SweetAlert success title="Success!" onConfirm={() => props.directToPath()}>
      You are now logged in!
    </SweetAlert>
  );

  const successfulRegistration = (
    <SweetAlert
      success
      title="Registered!!"
      onConfirm={() => props.directToPath()}
    >
      User has been registered. Speak to developer for admin access rights.
    </SweetAlert>
  );

  const unAuthorizedLogin = (
    <SweetAlert
      error
      title="Unauthorized Entry"
      onConfirm={() => props.alertType(payload)}
    >
      Username or Password is incorrect. Please try again.
    </SweetAlert>
  );

  if (props.typeOfAlert !== null) {
    switch (props.typeOfAlert) {
      case "successLogin":
        return successfulLogin;
      case "successDelete":
        return successfulDelete;
      case "delete":
        return deleteItem;
      case "successAdd":
        return successfulAdd;
      case "error":
        return errorMessage;
      case "successEmail":
        return successfulEmail;
      case "successEdit":
        return successfulEdit;
      case "noGeocode":
        return errorGeocode;
      case "successGeocode":
        return successfulGeocode;
      case "successGeocodeEvent":
        return successfulGeocodeEvent;
      case "successRegistration":
        return successfulRegistration;
      case "unAuthLogin":
        return unAuthorizedLogin;

      default:
        break;
    }
  } else {
    return null;
  }
};

export default AlertBox;
