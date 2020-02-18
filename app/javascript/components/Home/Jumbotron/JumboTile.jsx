import React from "react";

const JumboTile = props => {
  return (
    <div>
      <div>
        <h4 className="jumboFont2">{props.line1}</h4>
        <h1 className="card-title my-4 py-2 jumboFont">{props.line2}</h1>
        <h3 className="jumboFont3">{props.line3}</h3>
      </div>
    </div>
  );
};

export default JumboTile;
