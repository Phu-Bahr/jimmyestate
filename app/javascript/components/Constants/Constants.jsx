import styled, { keyframes } from "styled-components";
import { fadeIn, fadeInUp, fadeInDown } from "react-animations";

const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;
const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`;
const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

export { FadeIn };
export { FadeInDown };
export { FadeInUp };
