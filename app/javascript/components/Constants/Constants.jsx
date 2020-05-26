import React from "react";
import styled, { keyframes } from "styled-components";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInRight,
  fadeInLeft
} from "react-animations";

export const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

export const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`;

export const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

export const FadeInRight = styled.div`
  animation: 1s ${keyframes`${fadeInRight}`};
`;

export const FadeInLeft = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

export const ParallaxBanner = props => (
  <div
    className="parallaxStyleHome"
    style={{
      backgroundImage: "url(" + props.bannerImage + ")"
    }}
  />
);

export const ParallaxBannerRoutes = props => (
  <div
    className="parallaxStyleRoutes"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" +
        props.bannerImage +
        ")"
    }}
  >
    <div className="container py-5">
      <h1>{props.headerText1}</h1>
      <h4>{props.headerText2}</h4>
    </div>
  </div>
);

// pass down formConst as object from main component, onchange, and value=this.state
export const FormMaps = props => {
  const keyValuePair = Object.entries(props.formConst).map(([key, value]) => {
    return (
      <div key={key} className="form-group">
        <label htmlFor={key}>{value}</label>
        <input
          className="form-control"
          type="text"
          id={key}
          name={key}
          onChange={props.onChange}
          value={props.value[key]}
        />
      </div>
    );
  });

  return keyValuePair;
};

// as long as original component's state has the 3 keys below to send state down and up, this should work
// value=this.state, onchange, onsubmit
export const ParallaxEditForm = props => {
  const parallaxFormContent = {
    bannerImage: "Banner Image",
    headerText1: "Header text 1",
    headerText2: "Header text 2"
  };

  const keyValuePair = Object.entries(parallaxFormContent).map(
    ([key, value]) => {
      return (
        <div key={key} className="form-group">
          <label htmlFor={key}>{value}</label>
          <input
            className="form-control"
            type="text"
            id={key}
            name={key}
            onChange={props.onChange}
            value={props.value[key]}
          />
        </div>
      );
    }
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <form onSubmit={props.onSubmit}>
            {keyValuePair}
            <button type="submit" className="btn custom-button mt-3">
              Submit Header changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
