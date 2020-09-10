import React, { Fragment } from "react";

const AboutJimmyContent = props => {
  return (
    <Fragment>
      <div className="container">
        <p>{props.paragraph1}</p>
        <p>{props.paragraph2}</p>
        <p>{props.paragraph3}</p>
        <p>{props.paragraph4}</p>
        <p>{props.paragraph5}</p>
        <p>{props.paragraph6}</p>
        <p>{props.paragraph7}</p>
        <p>{props.paragraph8}</p>
      </div>
    </Fragment>
  );
};

export default AboutJimmyContent;
