import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const AlertBox = props => {
  const successfulDelete = (
    <SweetAlert success title="Deleted!" onConfirm={() => props.hidingAlert()}>
      Your item has been deleted.
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
      onCancel={() => props.hidingAlert()}
      focusCancelBtn
    ></SweetAlert>
  );

  if (props.typeOfAlert == "successDelete") {
    return successfulDelete;
  } else if (props.typeOfAlert == "delete") {
    return deleteItem;
  }
};

export default AlertBox;
