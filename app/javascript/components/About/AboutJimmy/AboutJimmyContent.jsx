import React, { Fragment } from "react";
import { FadeInRight } from "../../Constants/Constants";

const AboutJimmyContent = props => {
  return (
    <Fragment>
      <article>
        <FadeInRight>
          <div className="jimmy-signature about-hi-position mb-n5">Hi,</div>
          <p className="about-mobile-padding">{props.paragraph1}</p>
          <p>{props.paragraph2}</p>
          <p>{props.paragraph3}</p>
          <p>{props.paragraph4}</p>
          <p>{props.paragraph5}</p>
          <p>{props.paragraph6}</p>
          <p>{props.paragraph7}</p>
          <p className="jimmy-signature">{props.paragraph8}</p>
        </FadeInRight>
      </article>
    </Fragment>
  );
};

export default AboutJimmyContent;
