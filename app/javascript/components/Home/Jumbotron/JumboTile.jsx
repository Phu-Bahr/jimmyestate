import React from "react";

const JumboTile = props => {
  return (
    <header>
      <h1 className="jumboFont1">{props.line1}</h1>
      <h2 className="jumboFont2">{props.line2}</h2>
      <h3 className="jumboFont3">{props.line3}</h3>
    </header>
  );
};

export default JumboTile;
