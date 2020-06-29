import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert
      success
      title="Deleted!"
      onConfirm={() => props.alertType(null)}
    >
      Your content has been deleted.
    </SweetAlert>
  );

  const successfulAdd = (
    <SweetAlert
      success
      title="Success!"
      onConfirm={() => props.alertType(null)}
    >
      Your content has been added.
    </SweetAlert>
  );

  const successfulEmail = (
    <SweetAlert success title="Sent!" onConfirm={() => props.alertType(null)}>
      Jimmy has received your inquiry and will get back to you as soon as he
      can!
    </SweetAlert>
  );

  const successfulEdit = (
    <SweetAlert
      success
      title="Success!"
      onConfirm={() => props.alertType(null)}
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
      onCancel={() => props.alertType(null)}
      focusCancelBtn
    ></SweetAlert>
  );

  const errorMessage = (
    <SweetAlert warning title="ERROR" onConfirm={() => props.alertType(null)}>
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
