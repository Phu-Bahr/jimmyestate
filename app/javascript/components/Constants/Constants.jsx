import styled, { keyframes } from "styled-components";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInRight,
  fadeInLeft
} from "react-animations";

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`;

const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

const FadeInRight = styled.div`
  animation: 1s ${keyframes`${fadeInRight}`};
`;

const FadeInLeft = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

export { FadeIn, FadeInDown, FadeInUp, FadeInRight, FadeInLeft };
