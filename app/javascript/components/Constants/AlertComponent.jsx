import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const AlertBox = props => {
  console.log("alertbox props", props);

  const successfulDelete = (
    <SweetAlert
      success
      title="Deleted!"
      onConfirm={() => props.alertType(null)}
    >
      Your item has been deleted.
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
  }
};

export default AlertBox;