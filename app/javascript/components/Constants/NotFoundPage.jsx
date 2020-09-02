import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Fragment>
      <div className="not-found-page">404 not found</div>;
      <Link to="/">Go to Home</Link>
    </Fragment>
  );
};

export default NotFoundPage;
