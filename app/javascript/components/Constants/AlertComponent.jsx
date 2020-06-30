import React, { Fragment } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const payload = null;

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert
      title={
        <Fragment>
          <img
            style={{ height: "250px", width: "350px" }}
            src="https://media2.giphy.com/media/AgO9VR2a9KW1MSP73I/200.gif"
          />
          <br />
          <div>Deleted!</div>
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
          <img
            style={{ height: "250px", width: "350px" }}
            src="https://cdn.dribbble.com/users/4874/screenshots/1776423/inboxiconanimation_30.gif"
          />
          <br />
          <div>SENT</div>
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
      Your content has been edited.
    </SweetAlert>
  );

  const deleteItem = (
    <SweetAlert
      showCancel
      confirmBtnText="Delete"
      confirmBtnBsStyle="danger"
      title={
        <Fragment>
          <img
            style={{ height: "250px", width: "350px" }}
            src="https://media.tenor.com/images/4d641863b305acb3f6e6022fdfa299c0/tenor.gif"
          />
          <br />
          <div>Are you sure?</div>
        </Fragment>
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

  if (props.typeOfAlert == "successDelete") {
    return successfulDelete;
  } else if (props.typeOfAlert == "delete") {
    return deleteItem;
  } else if (props.typeOfAlert == "successAdd") {
    return successfulAdd;
  } else if (props.typeOfAlert == "error") {
    return errorMessage;
  } else if (props.typeOfAlert == "successEmail") {
    return successfulEmail;
  } else if (props.typeOfAlert == "successEdit") {
    return successfulEdit;
  }
};

export default AlertBox;
