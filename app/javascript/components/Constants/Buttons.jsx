import React from "react";
// import styled from "styled-components";

// export const CustomerButton = styled.button`
//   border-radius: 5px;
//   background-color: ${props => (props.secondary ? "#F7A072" : "#a1cdf1")};
//   color: #fff;
//   padding: 10px 15px;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   margin: 15px;
// `;

export const AddButton = ({ type, className, onClick, value }) => {
  return (
    <button
      type={type == "" ? submit : type}
      className={
        className == null
          ? "btn btn-outline-success"
          : `btn btn-outline-success ${className}`
      }
      onClick={onClick}
    >
      {value == null ? "Add" : value}
    </button>
  );
};

export const EditButton = ({ type, className, onClick, value }) => {
  return (
    <button
      type={type == "" ? button : type}
      className={
        className == null
          ? "btn btn-outline-info"
          : `btn btn-outline-info ${className}`
      }
      onClick={onClick}
    >
      {value == null ? "Edit" : value}
    </button>
  );
};

//for put fetches
export const UpdateButton = ({ type, className, onClick, value }) => {
  return (
    <button
      type={type == "" ? submit : type}
      className={
        className == null
          ? "btn btn-outline-warning"
          : `btn btn-outline-warning ${className}`
      }
      onClick={onClick}
    >
      {value == null ? "Update" : value}
    </button>
  );
};

export const DeleteButton = ({ type, className, onClick, value }) => {
  return (
    <button
      type={type == "" ? submit : type}
      className={
        className == null
          ? "btn btn-outline-danger"
          : `btn btn-outline-danger ${className}`
      }
      onClick={onClick}
    >
      {value == null ? "Delete" : value}
    </button>
  );
};

export const SubmitEmailButton = ({ className, value1, value2 }) => {
  return (
    <button
      type="submit"
      className={
        className == null ? "btn1 effect04" : `btn1 effect04 ${className}`
      }
      data-sm-link-text={value2 == null ? "Send" : value2}
    >
      <span>{value1 == null ? "Contact Me" : value1}</span>
    </button>
  );
};
