import React from "react";

const JumboTile = props => {
  return (
    <h1 className="jumboFont-primary">
      <span className="jumboFont1">{props.line1}</span>
      <span className="jumboFont2">{props.line2}</span>
      <span className="jumboFont3">{props.line3}</span>
    </h1>
  );
};

export default JumboTile;
