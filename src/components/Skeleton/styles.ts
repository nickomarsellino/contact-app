import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
`;

export const Skeleton = styled("div")`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 500px;
  position: relative;
  border-radius: 20px;
  height: 48px !important;

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
`;
