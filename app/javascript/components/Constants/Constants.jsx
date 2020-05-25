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
    className="parallaxStyleHome"
    style={{
      backgroundImage: "url(" + props.bannerImage + ")"
    }}
  >
    <div className="container py-5">
      <h1>{props.headerText1}</h1>
      <h4>{props.headerText2}</h4>
    </div>
  </div>
);
