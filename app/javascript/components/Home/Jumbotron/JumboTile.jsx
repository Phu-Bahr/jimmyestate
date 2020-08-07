import React, { Fragment } from "react";

const JumboTile = props => {
  return (
    <Fragment>
      <h4 className="jumboFont2">{props.line1}</h4>
      <h1 className="jumboFont">{props.line2}</h1>
      <h3 className="jumboFont3">{props.line3}</h3>
    </Fragment>
  );
};

export default JumboTile;
