import React from "react";

const JumboTile = props => {
  return (
    <React.Fragment>
      <h4 className="jumboFont2 centerJumboText">{props.line1}</h4>
      <h1 className="jumboFont centerJumboText2">{props.line2}</h1>
      <h3 className="jumboFont3 centerJumboText3">{props.line3}</h3>
    </React.Fragment>
  );
};

export default JumboTile;
