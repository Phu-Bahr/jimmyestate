import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const payload = null;

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert
      success
      title="Deleted!"
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
        <React.Fragment>
          <img
            style={{ height: "250px", width: "350px" }}
            src="https://cdn.dribbble.com/users/4874/screenshots/1776423/inboxiconanimation_30.gif"
          />
          <br />
          <div>SENT</div>
        </React.Fragment>
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
      warning
      showCancel
      confirmBtnText="Delete"
      confirmBtnBsStyle="danger"
      title="Are you sure?"
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
