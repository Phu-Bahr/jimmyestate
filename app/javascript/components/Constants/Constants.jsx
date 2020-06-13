import React from "react";
import styled, { keyframes } from "styled-components";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInRight,
  fadeInLeft,
  fadeOut
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

export const FadeOut = styled.div`
  animation: 1s ${keyframes`${fadeOut}`};
`;

//for navbar
export const StyledNavbar = styled.div`
  position: fixed;
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
`;

//for navbar
export const Transition = styled.div`
  .active {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear, all 0.8s ease-in;
  }
  .hidden {
    visibility: hidden;
    transform: translate(0, -350%);
    opacity: 0;
    transition: visibility 0s, opacity 0.1s linear, all 4s ease-out;
  }
  .top {
    @media only screen and (max-width: 600px) {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear, all 0.9s ease-in;
      position: sticky;
    }
  }
`;

// needs ...state or banner state
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
    <div className="container">
      <div className="header-alignment">
        <h1 id="header1">{props.headerText1}</h1>
        <h4 id="header2">{props.headerText2}</h4>
      </div>
    </div>
  </div>
);

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

export const FormNoLabel = props => {
  const keyValuePair = Object.entries(props.data).map(([key, value]) => {
    return (
      <div key={key} className="form-group">
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
