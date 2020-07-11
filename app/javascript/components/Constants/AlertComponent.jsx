import React, { Fragment } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const payload = null;
const fitGif = {
  height: "100%",
  width: "100%"
};

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert
      title={
        <Fragment>
          <div style={({ overflow: "hidden" }, fitGif)}>
            <img
              style={fitGif}
              src="https://media2.giphy.com/media/AgO9VR2a9KW1MSP73I/200.gif"
            />
            <br />
            <div>Deleted!</div>
          </div>
        </Fragment>
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
      onConfirm={() => props.alertType(payload)}
    >
      Your content has been added.
    </SweetAlert>
  );

  const successfulEmail = (
    <SweetAlert
      title={
        <Fragment>
          <div style={({ overflow: "hidden" }, fitGif)}>
            <img
              style={fitGif}
              src="https://cdn.dribbble.com/users/4874/screenshots/1776423/inboxiconanimation_30.gif"
            />
            <br />
            <div>SENT</div>
          </div>
        </Fragment>
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
      title="Success!"
      onConfirm={() => props.alertType(payload)}
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
        <Fragment>
          <div style={({ overflow: "hidden" }, fitGif)}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://media.tenor.com/images/4d641863b305acb3f6e6022fdfa299c0/tenor.gif"
            />
            <br />
            <div>Are you sure?</div>
          </div>
        </Fragment>
      }
      onConfirm={() => props.deleteEvent(props.idForAlert)}
      onCancel={() => props.alertType(payload)}
      focusCancelBtn
    ></SweetAlert>
  );

  const editTownList = (
    <SweetAlert
      success
      title="Edit Successful!"
      onConfirm={() => props.directToPath()}
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
          <div style={({ overflow: "hidden" }, fitGif)}>
            <img
              style={fitGif}
              src="https://media0.giphy.com/media/aN9GqoR7OD3nq/200.gif"
            />
            <br />
            <div>Location does not exist on Earth!</div>
          </div>
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
        <Fragment>
          <div style={({ overflow: "hidden" }, fitGif)}>
            <img
              style={fitGif}
              src="https://media1.giphy.com/media/9FXA260svGMw3QRFC8/giphy.gif"
            />
            <br />
            <div>Geocode Found!!</div>
          </div>
        </Fragment>
      }
      onConfirm={() => props.alertType(payload)}
    >
      Geocode has been updated to the database.
    </SweetAlert>
  );

  const successfulLogin = (
    <SweetAlert success title="Success!" onConfirm={() => props.directToPath()}>
      You are now logged in!
    </SweetAlert>
  );

  if (props.typeOfAlert !== null) {
    switch (props.typeOfAlert) {
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
      case "successEditTownList":
        return editTownList;
      case "successLogin":
        return successfulLogin;
      default:
        break;
    }
  } else {
    return null;
  }
};

export default AlertBox;

// if (props.typeOfAlert !== null) {
//   if (props.typeOfAlert == "successDelete") {
//     return successfulDelete;
//   } else if (props.typeOfAlert == "delete") {
//     return deleteItem;
//   } else if (props.typeOfAlert == "successAdd") {
//     return successfulAdd;
//   } else if (props.typeOfAlert == "error") {
//     return errorMessage;
//   } else if (props.typeOfAlert == "successEmail") {
//     return successfulEmail;
//   } else if (props.typeOfAlert == "successEdit") {
//     return successfulEdit;
//   } else if (props.typeOfAlert == "noGeocode") {
//     return errorGeocode;
//   } else if (props.typeOfAlert == "successGeocode") {
//     return successfulGeocode;
//   } else if (props.typeOfAlert == "successEditTownList") {
//     return editTownList;
//   } else if (props.typeOfAlert == "successLogin") {
//     return successfulLogin;
//   }
// } else {
//   return null;
// }
